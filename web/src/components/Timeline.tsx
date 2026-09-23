import { timeline } from '../data/history';

export default function Timeline() {
  return (
    <section className="timeline" id="zeittafel">
      <div className="section-head">
        <p className="eyebrow">Zeittafel</p>
        <h2>Stationen der Familie</h2>
      </div>
      <ol className="timeline-list">
        {timeline.map((e) => (
          <li key={e.year + e.text}>
            <a href={`#${e.chapter}`}>
              <span className="year">{e.year}</span>
              <span className="text">{e.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
