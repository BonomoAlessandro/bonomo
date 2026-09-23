import { useEffect } from 'react';
import type { TreeNode } from '../types';

interface Props {
  node: TreeNode;
  generation?: string;
  onClose: () => void;
  onNavigate: (n: TreeNode) => void;
}

export default function PersonDetail({ node, generation, onClose, onNavigate }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const ancestors: TreeNode[] = [];
  for (let c = node.parent; c; c = c.parent) ancestors.unshift(c);

  const surname = node.parent?.childSurname;

  return (
    <aside className="detail" aria-label={`Details zu ${node.name}`}>
      <button className="close" onClick={onClose} aria-label="Schliessen">
        ×
      </button>
      {generation && <p className="eyebrow">{generation}</p>}
      <h3>{node.name}</h3>
      {node.life && <p className="detail-life">{node.life}</p>}
      {surname && <p className="muted">Nachname laut Stammbaum: {surname}</p>}
      {node.nickname && <p className="detail-nick">«{node.nickname}»</p>}

      {node.firm && (
        <p>
          <span className="label">Geschäft</span> {node.firm}
        </p>
      )}

      {node.spouses && node.spouses.length > 0 && (
        <div className="detail-block">
          <span className="label">{node.spouses.length > 1 ? 'Ehen / Partnerschaften' : node.spouses[0].partner ? 'Partnerschaft' : 'Ehe'}</span>
          <ul>
            {node.spouses.map((s, i) => (
              <li key={i}>
                {s.partner ? '+' : '∞'} {node.spouses!.length > 1 && `${i + 1}. `}
                {s.name} {s.life && <span className="muted">{s.life}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {node.notes && node.notes.length > 0 && (
        <div className="detail-block">
          <span className="label">Notizen</span>
          <ul>
            {node.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {node.children && node.children.length > 0 && (
        <div className="detail-block">
          <span className="label">Kinder</span>
          <ul className="links">
            {node.children.map((c) => (
              <li key={c.id}>
                <button onClick={() => onNavigate(c)}>
                  {c.name} <span className="muted">{c.life}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ancestors.length > 0 && (
        <div className="detail-block">
          <span className="label">Abstammung</span>
          <ol className="links lineage">
            {ancestors.map((a) => (
              <li key={a.id}>
                <button onClick={() => onNavigate(a)}>
                  {a.name} <span className="muted">{a.life}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  );
}
