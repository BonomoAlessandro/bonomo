import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { buildTree, familyRoot, flatten, generationLabel, GENERATION_OFFSET } from '../data/family';
import type { TreeNode } from '../types';
import PersonDetail from './PersonDetail';

type Branch = 'alle' | 'marco' | 'anton';

const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.4;

export default function FamilyTree() {
  const tree = useMemo(() => buildTree(familyRoot), []);
  const all = useMemo(() => flatten(tree), [tree]);
  const byId = useMemo(() => new Map(all.map((n) => [n.id, n])), [all]);

  const marco = useMemo(() => all.find((n) => n.name === 'Marco fu Matteo' && n.life === '1860–1930')!, [all]);
  const anton = useMemo(() => all.find((n) => n.name === 'Giuseppe Antonio fu Matteo')!, [all]);

  const lineOf = useCallback(
    (n: TreeNode): 'marco' | 'anton' | 'stamm' => {
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

  const centerOn = useCallback((id?: string) => {
    const vp = viewportRef.current;
    if (!vp) return;
    requestAnimationFrame(() => {
      const el = id ? vp.querySelector<HTMLElement>(`[data-id="${id}"]`) : null;
      if (el) {
        const vr = vp.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        vp.scrollTo({
          left: vp.scrollLeft + er.left - vr.left - vr.width / 2 + er.width / 2,
          top: vp.scrollTop + er.top - vr.top - vr.height / 3,
          behavior: 'smooth',
        });
      } else {
        vp.scrollTo({ left: (vp.scrollWidth - vp.clientWidth) / 2, top: 0 });
      }
    });
  }, []);

  // Nach dem Rendern auf eine gesuchte Person scrollen, sonst beim Linienwechsel zur Wurzel
  const pendingFocus = useRef<string | null>(null);
  useEffect(() => {
    if (!pendingFocus.current) centerOn();
  }, [branch, centerOn]);
  useEffect(() => {
    if (!pendingFocus.current) return;
    centerOn(pendingFocus.current);
    pendingFocus.current = null;
  }, [branch, collapsed, selected, centerOn]);

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
          Nach Willi Bonomo (1965), mit Ergänzungen durch Regula Bonomo – Nachführung bis 30.08.2026. Klicken Sie auf eine
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

      <div
        className="tree-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="tree" style={{ zoom }}>
          <ul>
            <TreeItem
              node={root}
              collapsed={collapsed}
              onToggle={toggle}
              onSelect={setSelected}
              selectedId={selected?.id}
              lineOf={lineOf}
            />
          </ul>
        </div>
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

interface ItemProps {
  node: TreeNode;
  collapsed: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (n: TreeNode) => void;
  selectedId?: string;
  lineOf: (n: TreeNode) => 'marco' | 'anton' | 'stamm';
}

function TreeItem({ node, collapsed, onToggle, onSelect, selectedId, lineOf }: ItemProps) {
  const kids = node.children ?? [];
  const isCollapsed = collapsed.has(node.id);
  const multi = (node.parent?.spouses?.length ?? 0) > 1;
  const classes = [
    'node',
    lineOf(node),
    node.stammhalter && 'stammhalter',
    kids.length > 0 && 'has-kids',
    selectedId === node.id && 'selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li>
      <div className={classes} data-id={node.id}>
        {multi && node.union && <span className="union">aus {node.union}. Ehe</span>}
        <button className="person" onClick={() => onSelect(node)} title={generationLabel(node)}>
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
            className="toggle"
            onClick={() => onToggle(node.id)}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? `${kids.length} Kinder anzeigen` : 'Kinder ausblenden'}
          >
            {isCollapsed ? `▸ ${kids.length}` : '▾'}
          </button>
        )}
      </div>
      {kids.length > 0 && !isCollapsed && (
        <ul data-surname={node.childSurname}>
          {kids.map((c) => (
            <TreeItem
              key={c.id}
              node={c}
              collapsed={collapsed}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
              lineOf={lineOf}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
