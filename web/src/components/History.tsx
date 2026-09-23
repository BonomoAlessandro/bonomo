import { useEffect, useState } from 'react';
import { chapters } from '../data/history';

export default function History() {
  const [active, setActive] = useState(chapters[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="history" id="geschichte">
      <div className="section-head">
        <p className="eyebrow">Kurze Geschichte der Bonomo</p>
        <h2>Tausend Jahre in zehn Kapiteln</h2>
      </div>
      <div className="history-layout">
        <nav className="chapter-nav" aria-label="Kapitel">
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id} className={active === c.id ? 'active' : undefined}>
                <a href={`#${c.id}`}>
                  <span className="num">{toRoman(i + 1)}</span>
                  <span>
                    <span className="nav-place">{c.place}</span>
                    <span className="nav-era">{c.era}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="chapters">
          {chapters.map((c, i) => (
            <article key={c.id} id={c.id} className="chapter">
              <header>
                <p className="chapter-meta">
                  <span className="num">Kapitel {toRoman(i + 1)}</span>
                  <span>{c.place}</span>
                  <span>{c.era}</span>
                </p>
                <h3>{c.title}</h3>
              </header>
              {c.paragraphs.map((text, j) => (
                <p key={j} className={j === 0 ? 'first' : undefined}>
                  {text}
                </p>
              ))}
              {c.facts && (
                <dl className="facts">
                  {c.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {c.quote && (
                <blockquote>
                  <p>«{c.quote.text}»</p>
                  <cite>{c.quote.source}</cite>
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let out = '';
  for (const [v, r] of map) {
    while (n >= v) {
      out += r;
      n -= v;
    }
  }
  return out;
}
