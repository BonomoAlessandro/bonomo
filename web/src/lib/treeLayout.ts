import type { TreeNode } from '../types';

/*
 * Kompaktes Stammbaum-Layout nach dem Prinzip von Reingold-Tilford:
 * Geschwister-Teilbäume werden Ebene für Ebene anhand ihrer Umrisse (Konturen)
 * so nah wie möglich zusammengeschoben. Eine Person ohne Kinder braucht daher
 * nur auf ihrer eigenen Ebene Platz und rückt direkt an ihre Geschwister heran.
 * Alle Personen einer Generation stehen auf derselben Zeile.
 */

export interface Size {
  w: number;
  h: number;
}

export interface Placed {
  node: TreeNode;
  /** horizontale Mitte */
  x: number;
  /** Oberkante */
  y: number;
  w: number;
  h: number;
}

export interface Link {
  parent: Placed;
  children: Placed[];
  /** Höhe der waagrechten Verbindungslinie zu den Kindern */
  busY: number;
}

export interface Layout {
  placed: Placed[];
  links: Link[];
  width: number;
  height: number;
}

const GAP_SIBLINGS = 16;
const GAP_COUSINS = 30;
export const ROW_GAP = 64;
const PADDING = 24;

interface Sub {
  node: TreeNode;
  size: Size;
  kids: Sub[];
  /** x-Abstand der Kinder zur eigenen Mitte */
  offsets: number[];
  /** Kontur je Ebene relativ zur eigenen Mitte (Index 0 = der Knoten selbst) */
  left: number[];
  right: number[];
}

const gapAt = (depth: number) => (depth === 0 ? GAP_SIBLINGS : GAP_COUSINS);

/** Positionen der Kinder, von links her zusammengeschoben */
function packFromLeft(kids: Sub[]): number[] {
  const xs = [0];
  const mergedL = [...kids[0].left];
  const mergedR = [...kids[0].right];
  for (let k = 1; k < kids.length; k++) {
    const kid = kids[k];
    let shift = -Infinity;
    for (let d = 0; d < Math.min(mergedR.length, kid.left.length); d++) {
      shift = Math.max(shift, mergedR[d] - kid.left[d] + gapAt(d));
    }
    xs.push(shift);
    kid.left.forEach((l, d) => (mergedL[d] = Math.min(mergedL[d] ?? Infinity, shift + l)));
    kid.right.forEach((r, d) => (mergedR[d] = Math.max(mergedR[d] ?? -Infinity, shift + r)));
  }
  return xs;
}

/** Positionen der Kinder, von rechts her zusammengeschoben */
function packFromRight(kids: Sub[]): number[] {
  const last = kids.length - 1;
  const xs = new Array<number>(kids.length);
  xs[last] = 0;
  const mergedL = [...kids[last].left];
  const mergedR = [...kids[last].right];
  for (let k = last - 1; k >= 0; k--) {
    const kid = kids[k];
    let shift = Infinity;
    for (let d = 0; d < Math.min(mergedL.length, kid.right.length); d++) {
      shift = Math.min(shift, mergedL[d] - kid.right[d] - gapAt(d));
    }
    xs[k] = shift;
    kid.left.forEach((l, d) => (mergedL[d] = Math.min(mergedL[d] ?? Infinity, shift + l)));
    kid.right.forEach((r, d) => (mergedR[d] = Math.max(mergedR[d] ?? -Infinity, shift + r)));
  }
  return xs.map((x) => x - xs[0]);
}

/**
 * Kinderlose Geschwister, die vor dem ersten oder nach dem letzten Kind mit eigenen
 * Nachkommen stehen, werden nach innen in die Lücke zwischen den grossen Ästen gerückt.
 * Massgebend sind die Daten, nicht der Klappzustand, damit Karten beim Einklappen nicht springen.
 */
function arrangeChildren(children: TreeNode[]): TreeNode[] {
  const hasKids = (n: TreeNode) => (n.children?.length ?? 0) > 0;
  const first = children.findIndex(hasKids);
  const last = children.findLastIndex(hasKids);
  if (first === -1 || first === last) return children;
  return [
    children[first],
    ...children.slice(0, first),
    ...children.slice(first + 1, last),
    ...children.slice(last + 1),
    children[last],
  ];
}

function build(node: TreeNode, isCollapsed: (id: string) => boolean, sizeOf: (id: string) => Size): Sub {
  const size = sizeOf(node.id);
  const visible = isCollapsed(node.id) ? [] : arrangeChildren(node.children ?? []);
  const kids = visible.map((c) => build(c, isCollapsed, sizeOf));
  const sub: Sub = { node, size, kids, offsets: [], left: [-size.w / 2], right: [size.w / 2] };
  if (!kids.length) return sub;

  // Beide Packrichtungen erfüllen alle Abstandsbedingungen; ihr Mittel ebenso.
  // So verteilen sich kleine Äste zwischen grossen gleichmässig statt einseitig.
  const fromLeft = packFromLeft(kids);
  const fromRight = packFromRight(kids);
  const xs = fromLeft.map((x, i) => (x + fromRight[i]) / 2);
  const mid = (xs[0] + xs[xs.length - 1]) / 2;
  sub.offsets = xs.map((x) => x - mid);

  kids.forEach((kid, i) => {
    kid.left.forEach((l, d) => (sub.left[d + 1] = Math.min(sub.left[d + 1] ?? Infinity, sub.offsets[i] + l)));
    kid.right.forEach((r, d) => (sub.right[d + 1] = Math.max(sub.right[d + 1] ?? -Infinity, sub.offsets[i] + r)));
  });
  return sub;
}

export function layoutTree(
  root: TreeNode,
  isCollapsed: (id: string) => boolean,
  sizeOf: (id: string) => Size,
): Layout {
  const tree = build(root, isCollapsed, sizeOf);

  // Zeilenhöhe je Generation = höchste Karte dieser Generation
  const rowHeight: number[] = [];
  const collectHeights = (s: Sub, d: number) => {
    rowHeight[d] = Math.max(rowHeight[d] ?? 0, s.size.h);
    s.kids.forEach((k) => collectHeights(k, d + 1));
  };
  collectHeights(tree, 0);
  const rowTop = [0];
  rowHeight.forEach((h, d) => (rowTop[d + 1] = rowTop[d] + h + ROW_GAP));

  const placed: Placed[] = [];
  const links: Link[] = [];
  const place = (s: Sub, x: number, d: number): Placed => {
    const p: Placed = { node: s.node, x, y: rowTop[d], w: s.size.w, h: s.size.h };
    placed.push(p);
    if (s.kids.length) {
      const children = s.kids.map((k, i) => place(k, x + s.offsets[i], d + 1));
      links.push({ parent: p, children, busY: rowTop[d] + rowHeight[d] + ROW_GAP / 2 });
    }
    return p;
  };
  place(tree, 0, 0);

  const minX = Math.min(...placed.map((p) => p.x - p.w / 2));
  const maxX = Math.max(...placed.map((p) => p.x + p.w / 2));
  const dx = PADDING - minX;
  placed.forEach((p) => (p.x += dx));
  links.forEach((l) => (l.busY += PADDING));
  placed.forEach((p) => (p.y += PADDING));

  return {
    placed,
    links,
    width: maxX - minX + 2 * PADDING,
    height: rowTop[rowHeight.length - 1] + rowHeight[rowHeight.length - 1] + 2 * PADDING,
  };
}
