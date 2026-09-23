import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent, Ref } from 'react';
import { buildTree, familyRoot, flatten, generationLabel, GENERATION_OFFSET } from '../data/family';
import { layoutTree } from '../lib/treeLayout';
import type { Link, Size } from '../lib/treeLayout';
import type { TreeNode } from '../types';
import PersonDetail from './PersonDetail';

type Line = 'marco' | 'anton' | 'stamm';

type Branch = 'alle' | 'marco' | 'anton';

const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.4;
/** Platz für die Titelkartusche über dem Baum */
const TITLE_HEIGHT = 230;
const TITLE_HALF_WIDTH = 170;

export default function FamilyTree() {
  const tree = useMemo(() => buildTree(familyRoot), []);
  const all = useMemo(() => flatten(tree), [tree]);
  const byId = useMemo(() => new Map(all.map((n) => [n.id, n])), [all]);

  const marco = useMemo(() => all.find((n) => n.name === 'Marco fu Matteo' && n.life === '1860–1930')!, [all]);
  const anton = useMemo(() => all.find((n) => n.name === 'Giuseppe Antonio fu Matteo')!, [all]);

  const lineOf = useCallback(
    (n: TreeNode): Line => {
      for (let c: TreeNode | undefined = n; c; c = c.parent) {
        if (c === marco) return 'marco';
        if (c === anton) return 'anton';
      }
      return 'stamm';
    },
    [marco, anton],
  );

  const [branch, setBranch] = useState<Branch>('alle');
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [zoom, setZoom] = useState(0.8);
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const [query, setQuery] = useState('');

  const root = branch === 'marco' ? marco : branch === 'anton' ? anton : tree;

  const viewportRef = useRef<HTMLDivElement>(null);

  // Kartengrössen werden einmal unsichtbar gemessen und dann für das Layout verwendet
  const measureRefs = useRef(new Map<string, HTMLDivElement>());
  const [sizes, setSizes] = useState<Map<string, Size> | null>(null);
  const measure = useCallback(() => {
    const next = new Map<string, Size>();
    measureRefs.current.forEach((el, id) => next.set(id, { w: el.offsetWidth, h: el.offsetHeight }));
    // oxlint-disable-next-line react/set-state-in-effect
    setSizes(next);
  }, []);
  // Messen der gerenderten Karten ist Synchronisation mit dem DOM und braucht einen Layout-Effekt
  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    // Nach dem Laden der Webfonts ändern sich die Masse
    document.fonts?.ready.then(measure);
  }, [measure]);

  const layout = useMemo(
    () =>
      sizes &&
      layoutTree(
        root,
        (id) => collapsed.has(id),
        (id) => sizes.get(id) ?? { w: 150, h: 60 },
      ),
    [root, collapsed, sizes],
  );

  const centerOn = useCallback((id: string, toTop: boolean) => {
    const vp = viewportRef.current;
    const el = vp?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!vp || !el) return;
    const vr = vp.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    vp.scrollTo({
      left: vp.scrollLeft + er.left - vr.left - vr.width / 2 + er.width / 2,
      top: toTop ? 0 : vp.scrollTop + er.top - vr.top - vr.height / 3,
      behavior: toTop ? 'auto' : 'smooth',
    });
  }, []);

  // Nach dem Rendern auf eine gesuchte Person scrollen, sonst beim Linienwechsel zur Wurzel
  const pendingFocus = useRef<string | null>(null);
  const needRootCenter = useRef(true);
  useEffect(() => {
    needRootCenter.current = true;
  }, [branch]);
  useEffect(() => {
    if (!layout) return;
    if (pendingFocus.current) {
      centerOn(pendingFocus.current, false);
      pendingFocus.current = null;
      needRootCenter.current = false;
    } else if (needRootCenter.current) {
      centerOn(root.id, true);
      needRootCenter.current = false;
    }
  }, [layout, selected, root, centerOn]);

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Generation 1 = Tiefe GENERATION_OFFSET; Liste wächst mit den Daten mit
  const generations = useMemo(() => {
    const max = Math.max(...all.map((n) => n.depth)) - GENERATION_OFFSET + 1;
    return Array.from({ length: max }, (_, i) => i + 1);
  }, [all]);

  const collapseFromGeneration = (gen: number | null) => {
    if (gen === null) return setCollapsed(new Set());
    const depth = gen + GENERATION_OFFSET - 1;
    setCollapsed(new Set(all.filter((n) => n.depth >= depth && n.children?.length).map((n) => n.id)));
  };

  const reveal = (node: TreeNode) => {
    const inMarco = lineOf(node) === 'marco';
    const inAnton = lineOf(node) === 'anton';
    if ((branch === 'marco' && !inMarco) || (branch === 'anton' && !inAnton)) setBranch('alle');
    setCollapsed((prev) => {
      const next = new Set(prev);
      for (let c = node.parent; c; c = c.parent) next.delete(c.id);
      return next;
    });
    pendingFocus.current = node.id;
    setSelected(node);
    setQuery('');
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return all
      .filter((n) => n.name.toLowerCase().includes(q) || n.spouses?.some((s) => s.name.toLowerCase().includes(q)))
      .slice(0, 10);
  }, [query, all]);

  // Ziehen zum Verschieben
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    const vp = viewportRef.current!;
    drag.current = { x: e.clientX, y: e.clientY, left: vp.scrollLeft, top: vp.scrollTop };
    vp.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const vp = viewportRef.current!;
    vp.scrollLeft = d.left - (e.clientX - d.x);
    vp.scrollTop = d.top - (e.clientY - d.y);
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const changeZoom = (delta: number) =>
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 10) / 10)));

  return (
    <section className="tree-section" id="stammbaum">
      <div className="section-head">
        <p className="eyebrow">Stammbaum der Familie Bonomo, genannt Calzin</p>
        <h2>Von Cristiano bis heute</h2>
        <p className="muted">
          Nach Willi Bonomo (1965) – Nachführung bis 23.09.2026. Klicken Sie auf eine
          Person für Details, auf ▾ zum Ein- und Ausklappen. Mit gedrückter Maustaste lässt sich der Baum verschieben.
        </p>
      </div>

      <div className="tree-toolbar">
        <div className="segmented" role="group" aria-label="Linie wählen">
          {(
            [
              ['alle', 'Ganzer Stamm'],
              ['marco', 'Linie Marco'],
              ['anton', 'Linie Giuseppe Antonio'],
            ] as const
          ).map(([key, label]) => (
            <button key={key} className={branch === key ? 'active' : undefined} onClick={() => setBranch(key)}>
              {label}
            </button>
          ))}
        </div>

        <label className="depth-select">
          <span>Anzeigen bis</span>
          <select
            defaultValue="all"
            onChange={(e) => collapseFromGeneration(e.target.value === 'all' ? null : Number(e.target.value))}
          >
            <option value="all">alle Generationen</option>
            {generations.map((g) => (
              <option key={g} value={g}>
                {g}. Generation
              </option>
            ))}
          </select>
        </label>

        <div className="search">
          <input
            type="search"
            placeholder="Person suchen …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Person im Stammbaum suchen"
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((n) => (
                <li key={n.id}>
                  <button onClick={() => reveal(n)}>
                    <strong>{n.name}</strong> <span>{n.life}</span>
                    {n.spouses?.length ? <em> ∞ {n.spouses.map((s) => s.name).join(', ')}</em> : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="zoom" role="group" aria-label="Zoom">
          <button onClick={() => changeZoom(-0.1)} aria-label="Verkleinern">
            −
          </button>
          <span>{Math.round(zoom * 100)} %</span>
          <button onClick={() => changeZoom(0.1)} aria-label="Vergrössern">
            +
          </button>
        </div>
      </div>

      <div className="legend">
        <span>
          <i className="swatch marco" /> Linie Marco (1860–1930)
        </span>
        <span>
          <i className="swatch anton" /> Linie Giuseppe Antonio (1867–1918)
        </span>
        <span>
          <i className="swatch stammhalter" /> Im Original hervorgehoben
        </span>
        <span>∞ verheiratet · + Partnerschaft</span>
      </div>

      <div className="tree-frame">
        <div
          className="tree-viewport"
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="tree" style={{ zoom }}>
            {layout && (
              <div className="tree-canvas" style={{ width: layout.width, height: layout.height + TITLE_HEIGHT }}>
                {/* Titelkartusche steht über der Wurzel, auch wenn diese nicht in der Mitte liegt */}
                <div
                  className="tree-title"
                  aria-hidden="true"
                  style={{ left: Math.max(layout.placed[0].x, TITLE_HALF_WIDTH) }}
                >
                  <img src="/wappen.png" alt="" />
                  <p className="t1">Stammbaum der Familie</p>
                  <p className="t2">Bonomo</p>
                  <p className="t3">
                    genannt Calzin
                    {branch === 'marco' && ' · Linie Marco'}
                    {branch === 'anton' && ' · Linie Giuseppe Antonio'}
                  </p>
                </div>
                <div className="tree-plane" style={{ top: TITLE_HEIGHT }}>
                  <svg className="tree-links" width={layout.width} height={layout.height} aria-hidden="true">
                    {layout.links.map((l) => (
                      <path key={l.parent.node.id} d={linkPath(l)} />
                    ))}
                  </svg>
                  {layout.links.map(
                    (l) =>
                      l.parent.node.childSurname && (
                        <span
                          key={`s-${l.parent.node.id}`}
                          className="child-surname"
                          style={{ left: l.parent.x + 16, top: l.parent.y + l.parent.h + 8 }}
                        >
                          {l.parent.node.childSurname}
                        </span>
                      ),
                  )}
                  {layout.placed.map((p) => (
                    <NodeCard
                      key={p.node.id}
                      node={p.node}
                      line={lineOf(p.node)}
                      collapsed={collapsed.has(p.node.id)}
                      selected={selected?.id === p.node.id}
                      onSelect={setSelected}
                      onToggle={toggle}
                      style={{ left: p.x - p.w / 2, top: p.y, width: p.w }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {['tl', 'tr', 'bl', 'br'].map((c) => (
          <span key={c} className={`corner ${c}`} aria-hidden="true" />
        ))}
      </div>

      <div className="tree-measure" aria-hidden="true">
        {all.map((n) => (
          <NodeCard
            key={n.id}
            ref={(el) => {
              if (el) measureRefs.current.set(n.id, el);
              else measureRefs.current.delete(n.id);
            }}
            node={n}
            line={lineOf(n)}
            collapsed={false}
            selected={false}
          />
        ))}
      </div>

      {selected && (
        <PersonDetail
          node={byId.get(selected.id)!}
          generation={generationLabel(selected)}
          onClose={() => setSelected(null)}
          onNavigate={reveal}
        />
      )}
    </section>
  );
}

/** Verbindung Eltern → Kinder: Stamm, waagrechte Linie, Abgänge mit gerundeten Ecken */
function linkPath({ parent, children, busY }: Link): string {
  const px = parent.x;
  const bottom = parent.y + parent.h;
  return children
    .map((c) => {
      const dx = c.x - px;
      if (Math.abs(dx) < 1) return `M${px},${bottom}V${c.y}`;
      const r = Math.min(8, Math.abs(dx));
      const dir = Math.sign(dx);
      return `M${px},${bottom}V${busY}H${c.x - dir * r}Q${c.x},${busY} ${c.x},${busY + r}V${c.y}`;
    })
    .join('');
}

interface CardProps {
  node: TreeNode;
  line: Line;
  collapsed: boolean;
  selected: boolean;
  onSelect?: (n: TreeNode) => void;
  onToggle?: (id: string) => void;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

function NodeCard({ node, line, collapsed, selected, onSelect, onToggle, style, ref }: CardProps) {
  const kids = node.children ?? [];
  const multi = (node.parent?.spouses?.length ?? 0) > 1;
  const interactive = Boolean(onSelect);
  const classes = [
    'node',
    line,
    node.stammhalter && 'stammhalter',
    kids.length > 0 && 'has-kids',
    selected && 'selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-id={interactive ? node.id : undefined} style={style} ref={ref}>
      {multi && node.union && <span className="union">aus {node.union}. Ehe</span>}
      <button
        className="person"
        onClick={() => onSelect?.(node)}
        title={generationLabel(node)}
        tabIndex={interactive ? 0 : -1}
      >
        <span className="name">{node.name}</span>
        {node.life && <span className="life">{node.life}</span>}
        {node.nickname && <span className="nick">«{node.nickname}»</span>}
      </button>
      {node.spouses?.map((sp, i) => (
        <div className="spouse" key={i}>
          <span className="sym">{sp.partner ? '+' : '∞'}</span>
          <span>
            {node.spouses!.length > 1 && `${i + 1}. `}
            {sp.name}
            {sp.life && <span className="life"> {sp.life}</span>}
          </span>
        </div>
      ))}
      {kids.length > 0 && (
        <button
          className={collapsed ? 'toggle sealed' : 'toggle'}
          onClick={() => onToggle?.(node.id)}
          tabIndex={interactive ? 0 : -1}
          aria-expanded={!collapsed}
          aria-label={collapsed ? `${kids.length} Kinder anzeigen` : 'Kinder ausblenden'}
        >
          {collapsed ? kids.length : '▾'}
        </button>
      )}
    </div>
  );
}
