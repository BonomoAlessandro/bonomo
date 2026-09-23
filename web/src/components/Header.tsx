const links = [
  { href: '#geschichte', label: 'Geschichte' },
  { href: '#zeittafel', label: 'Zeittafel' },
  { href: '#wappen', label: 'Wappen' },
  { href: '#stammbaum', label: 'Stammbaum' },
];

export default function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand">
        <img src="/wappen.png" alt="" width={28} height={38} />
        <span>I Bonomo</span>
      </a>
      <nav aria-label="Hauptnavigation">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
