const earlier = [
  { place: 'Venedig', text: 'Die ältesten Wappen: ein griechisches Kreuz mit vier Buchstaben B.' },
  {
    place: 'Triest',
    text: 'Silberne Treppe auf rotem Grund, mit der Grafenwürde die goldene Krone; als Helmzier ein Rabe (corvo), wohl nach Francesco Corvo Bonomo. Daneben ein geteilter Schild in Rot und Blau.',
  },
  { place: 'Triest, früher', text: 'Blaues Wappen mit einem stehenden silbernen Hund, eine Lilie in den Pfoten.' },
  {
    place: 'Asiago',
    text: 'Nach der Flucht aus Triest: die Stammesfarben Rot und Blau, dazu ein springender Stier, um die Verbundenheit mit Grund und Boden zu dokumentieren; oft mit dem Hauszeichen.',
  },
];

export default function CoatOfArms() {
  return (
    <section className="arms" id="wappen">
      <div className="arms-figure">
        <img src="/wappen.png" alt="Wappen der Familie Bonomo" />
        <p className="caption">Wappen vom Titelblatt «I Bonomo», Willi Bonomo 1965</p>
      </div>
      <div className="arms-text">
        <p className="eyebrow">Das Familienwappen</p>
        <h2>Stier und Hauszeichen</h2>
        <p>
          Das Wappen auf dem Titelblatt von Willi Bonomos Schrift zeigt in einem ovalen Schild oben einen Stier und darunter
          ein Hauszeichen, gerahmt von einer Kartusche. Stier und Hauszeichen entsprechen dem Wappen, das Willi Bonomo für den
          Stamm Asiago beschreibt. Welches der Wappen die Familie eigentlich zu tragen berechtigt ist, sollte nach seiner
          Ansicht ein Heraldiker feststellen.
        </p>
        <p className="muted">
          Aus der Gestaltung des Wappens und seinem Wandel über die Jahrhunderte lassen sich Rückschlüsse auf das Ergehen der
          Familie ziehen:
        </p>
        <ul className="arms-list">
          {earlier.map((e) => (
            <li key={e.place}>
              <strong>{e.place}</strong>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
