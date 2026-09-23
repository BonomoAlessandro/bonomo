import { useMemo } from 'react';
import { buildTree, familyRoot, flatten } from '../data/family';

export default function Hero() {
  const stats = useMemo(() => {
    const all = flatten(buildTree(familyRoot));
    const spouses = all.reduce((n, p) => n + (p.spouses?.length ?? 0), 0);
    const maxDepth = Math.max(...all.map((p) => p.depth));
    return { persons: all.length + spouses, generations: maxDepth + 1 };
  }, []);

  return (
    <section className="hero" id="top">
      <img className="hero-crest" src="/wappen.png" alt="Familienwappen der Bonomo: Stier über dem Hauszeichen in einer Kartusche" />
      <p className="eyebrow">Familie Bonomo, genannt Calzin</p>
      <h1>I Bonomo</h1>
      <p className="lede">
        Von Venedig und Triest über Asiago bis nach Dübendorf – tausend Jahre Familiengeschichte, nacherzählt nach dem
        Vortrag von Willi Bonomo aus dem Jahr 1965.
      </p>
      <dl className="hero-stats">
        <div>
          <dt>~1000</dt>
          <dd>Jahre Geschichte</dd>
        </div>
        <div>
          <dt>{stats.generations}</dt>
          <dd>Generationen im Stammbaum</dd>
        </div>
        <div>
          <dt>{stats.persons}</dt>
          <dd>Personen</dd>
        </div>
      </dl>
      <div className="hero-actions">
        <a className="btn primary" href="#geschichte">Geschichte lesen</a>
        <a className="btn" href="#stammbaum">Zum Stammbaum</a>
      </div>
    </section>
  );
}
