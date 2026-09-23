export default function Footer() {
  return (
    <footer className="site-footer">
      <img src="/wappen.png" alt="" width={40} height={54} />
      <div>
        <p>
          <strong>Quellen</strong>
        </p>
        <ul>
          <li>
            Willi Bonomo: <em>I Bonomo – Kurze Einführung in die Geschichte der Familie Bonomo</em>. Vortrag an der ersten
            Familienzusammenkunft, Uetikon, 18. September 1965.
          </li>
          <li>Neujahrsbrief an die Familie Bonomo, Meilen, 27. Dezember 1979.</li>
          <li>
            Stammbaum der Familie Bonomo, genannt Calzin – Nachführung bis 23.09.2026.
          </li>
        </ul>
        <p className="muted">Die Geschichte gibt den Forschungsstand von Willi Bonomo (1965) wieder und ist keine gesicherte Chronik.</p>
      </div>
    </footer>
  );
}
