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
          <li>Neujahrsbrief an die Familie Bonomo, Meilen, 27. Dezember 1979 (der Schrift beiliegend, handschriftlich unterzeichnet).</li>
          <li>
            Stammbaum der Familie Bonomo, genannt Calzin – mit Ergänzungen durch Regula Bonomo, Nachführung bis 30.08.2026.
          </li>
        </ul>
        <p className="muted">Die Geschichte gibt den Forschungsstand von Willi Bonomo (1965) wieder und ist keine gesicherte Chronik. Offensichtliche Schreibfehler der Originalauflage (Jahr der Zerstörung Altinums, Jahr der Seligsprechung) sind korrigiert.</p>
      </div>
    </footer>
  );
}
