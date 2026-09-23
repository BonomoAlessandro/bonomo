import type { Person, Spouse, TreeNode } from '../types';

/*
 * Stammbaum der Familie BONOMO, genannt CALZIN
 * nach Willi Bonomo, "I Bonomo – kurze Einführung in die Geschichte der Familie Bonomo", 1965,
 * mit Ergänzungen durch Regula Bonomo (Nachführung bis 30.08.2026).
 */

const p = (name: string, life?: string, extra: Partial<Person> = {}): Person => ({ name, life, ...extra });
const s = (name: string, life?: string, extra: Partial<Spouse> = {}): Spouse => ({ name, life, ...extra });

// ---------------------------------------------------------------------------
// Linie Marco (1860–1930)
// ---------------------------------------------------------------------------

const matteo1885 = p('Matteo fu Marco', '1885–1953', {
  stammhalter: true,
  nickname: 'Götti/Unggle Matte',
  firm: 'Marco Bonomo Söhne',
  notes: ['Grundstrasse 5: «Die d’obe»'],
  spouses: [s('Emma Rinderknecht', '1893–1983')],
  children: [
    p('Gret', '1917–1969'),
    p('Hedi', '1921–202?', {
      childSurname: 'Keller',
      spouses: [s('Bernhard Keller', '1914–1960'), s('Robert Alemann', '19??–19??', { partner: true })],
      children: [
        p('Bernhard', '1945–2017', { union: 1, spouses: [s('Barbara Demuth', '1947–', { partner: true })] }),
        p('Andres', '1947–', { union: 1, spouses: [s('Margrit Schuele', '1943–???')] }),
      ],
    }),
    p('Eleonore Loni', '1928–2019'),
  ],
});

const umberto1888 = p('Umberto fu Marco', '1888–1948', {
  stammhalter: true,
  nickname: 'Götti/Unggle Bert',
  firm: 'Umberto Bonomo Söhne (ab 1949)',
  notes: [
    'Einreise nach Dübendorf: 13.08.1906, Dübelstein',
    'Heirat: 15.07.1913',
    'Einbürgerung: 16.04.1914',
    'Grundstrasse 15: «Die d’une»',
  ],
  spouses: [s('Elise (Lisa) Müller', '1891–1972')],
  children: [
    p('Kurt', '1915–1981', {
      stammhalter: true,
      spouses: [s('Gret Keel', '1916–1999')],
      children: [
        p('Eva', '1943–', {
          childSurname: 'Bänninger',
          spouses: [s('Jürg Bänninger', '1942–')],
          children: [
            p('Lukas', '1974–', {
              childSurname: 'Leone',
              spouses: [s('Stefania Leone', '1979–')],
              children: [p('Magali Olivia', '2012–'), p('Ellis', '2016–')],
            }),
            p('Matthias', '1976–', {
              spouses: [s('Lisa Qian', '1985–')],
              children: [p('Melanie', '2018–'), p('Livia', '2018–')],
            }),
            p('Christine', '1978–', {
              childSurname: 'Claure',
              spouses: [s('Mauricio Claure-Orias', '1971–')],
              notes: ['∞/+ Mauricio Claure-Orias'],
              children: [p('Fabian', '2011–'), p('Noémie', '2013–'), p('Anouk', '2018–')],
            }),
          ],
        }),
        p('Hens (Hansjörg)', '1945–', {
          stammhalter: true,
          spouses: [s('Lotti Hebeisen', '1945–')],
          children: [
            p('Carla', '1977–', {
              childSurname: 'Coradi',
              spouses: [s('Manuel Coradi')],
              children: [p('Dino', '2011–'), p('Rico', '2011–')],
            }),
          ],
        }),
        p('Pe (Peter)', '1949–', {
          spouses: [s('Heather Parsons', '1951–')],
          children: [
            p('Fabienne', '1978–', {
              childSurname: 'Winkler',
              spouses: [s('Stefan Winkler Bonomo', '1978–')],
              children: [p('Liam Makaio', '2017–')],
            }),
            p('Annette', '1980–', {
              childSurname: 'Bonomo',
              spouses: [s('Peter Bonomo (-Meier)', '1979–')],
              children: [p('Anouk Leyna', '2008–'), p('Noa Malaika', '2010–')],
            }),
            p('Tobias', '1982–', {
              spouses: [s('Sandra Bonomo Peter', '1988–')],
              children: [p('Malea Rose', '2015–'), p('Kimo Roy', '2017–')],
            }),
            p('Franziska Bonomo', '1985–', {
              spouses: [s('Lukas Wirth', '1989–')],
              children: [p('Andri Luca', '2016–')],
            }),
          ],
        }),
      ],
    }),
    p('Hans', '1918–1993', {
      stammhalter: true,
      spouses: [s('Nelly Graf', '1919–2005')],
      children: [
        p('Marco', '1945–', {
          spouses: [s('Heidi Huwyler', '1958–'), s('Lucia Aguirre', '1950–')],
          children: [
            p('Martina', '1981–', {
              childSurname: '??',
              union: 1,
              spouses: [s('Roland Klöti')],
              children: [p('Elin Chiara', '2017–'), p('Mädchen', '2019–')],
            }),
            p('Fabio', '1982–', { union: 1 }),
            p('Claudio', '1985–1985', { union: 1 }),
            p('Patrizia', '1986–', {
              childSurname: 'Kuster',
              union: 1,
              spouses: [s('Daniel Kuster')],
              children: [p('Joël', '2018–'), p('Knabe', '2020/21?')],
            }),
          ],
        }),
        p('Sergio', '1951–'),
      ],
    }),
    p('Max', '1923–2017', {
      stammhalter: true,
      spouses: [s('Leni (Madeleine) Vogel', '1924–1997')],
      children: [
        p('Reto', '1951–', {
          spouses: [s('Monique Eckert', '1953–')],
          children: [
            p('Andrea', '1981–', { spouses: [s('Sarah Meier', '1983–')] }),
            p('Maria', '1986–', {
              childSurname: 'Keller',
              spouses: [s('Adrian Keller', '1982–')],
              children: [p('Malina Lena', '2020–'), p('Nino Andri', '2023–')],
            }),
          ],
        }),
        p('Regula', '1953–', {
          spouses: [s('Max Müller', '1956–')],
        }),
      ],
    }),
    p('Marianne', '1928–2009', {
      childSurname: 'Toggweiler',
      spouses: [s('Karl Toggweiler', '1923–2016')],
      children: [
        p('Tobias', '1954–', { spouses: [s('Monika …', undefined, { partner: true })] }),
        p('Karl Mattias', '1957–1986'),
        p('Johanna', '1958–1963'),
        p('Marianne', '1956–2023', {
          childSurname: 'Hunger',
          spouses: [s('Christian Hunger', '1954–')],
          children: [p('Johannes', '1981–'), p('Sabine', '1983–'), p('Jeremias', '1991–')],
        }),
      ],
    }),
  ],
});

const ines1891 = p('Ines', '1891–1946', {
  childSurname: 'Masut',
  notes: ['Einreise nach Dübendorf: 26.07.1912 – 12.05.1913'],
  spouses: [s('Vincenzo Masut', '1890–1947')],
  children: [
    p('Elena', '1914–1924'),
    p('Bianca', '1916–', {
      childSurname: 'Mancini',
      spouses: [s('Nino Mancini', '1908–1971')],
      children: [
        p('Felice', '1940–', {
          spouses: [s('Maria Luisa Francesconi', '1941–')],
          children: [p('Ilaria', '1970–'), p('Matteo', '1975–')],
        }),
        p('Luigia', '1942–', {
          childSurname: '??',
          spouses: [s('Enzo Grigoletti', '1941–')],
          children: [p('Rossana', '1968–'), p('Marco', '1969–', { spouses: [s('Luicia de Michele')] })],
        }),
      ],
    }),
    p('Francesca', '1926–', {
      childSurname: 'Manzetti',
      spouses: [s('Cornelio Manzetti', '1924–1997')],
      children: [p('Massimiliano Marco', '1953–', { spouses: [s('Gabriella Lodigin', '1957–')] })],
    }),
    p('Marco', '1930–1993', {
      spouses: [s('Enrica Ramponi', '1932–')],
      children: [
        p('Cristina', '1953–', {
          childSurname: 'Feluca',
          spouses: [s('Sergio Feluca'), s('Giovanni Scambati')],
          children: [p('Barbara', '1978–', { union: 1 })],
        }),
        p('Daniele', '1957–', { spouses: [s('Patrizia Marcoli', '1956–')], children: [p('Luca', '1991–')] }),
        p('Elena', '1958–', {
          childSurname: '?',
          spouses: [s('Stefano Dammito'), s('Giuseppe Bagnarelli')],
          children: [p('Bianca', '1988–'), p('Bruno', '1994–')],
        }),
      ],
    }),
  ],
});

const enrico1893 = p('Enrico fu Marco', '1893–1973', {
  stammhalter: true,
  nickname: 'Götti/Unggle Rico',
  firm: 'Gebrüder Bonomo',
  notes: ['Grundstrasse 15: «Die d’äne»'],
  spouses: [s('Rosly Bachmann', '1896–1993')],
  children: [
    p('Rose Marie', '1921–1988', { spouses: [s('Albert Merz', '1921–')] }),
    p('Silvia', '1923–2014', { spouses: [s('Hans Georg Friedrich', '1923–1986')] }),
    p('Franz', '1925–2022', {
      stammhalter: true,
      spouses: [s('Melanie Kennel', '1927–2009')],
      children: [p('Alessandro', '1957–', { spouses: [s('Irene Kappeler', '1962–')] })],
    }),
    p('Rolf', '1930–2016', {
      stammhalter: true,
      spouses: [s('Elsbeth Naef', '1941–')],
      children: [
        p('Wanda', '1965–'),
        p('Nadja', '1969–', { children: [p('Laura', '2014–'), p('Noah', '2014–')] }),
        p('Larissa', '1970–'),
      ],
    }),
  ],
});

const attilio1896 = p('Attilio fu Marco', '1896–1979', {
  stammhalter: true,
  nickname: 'Götti/Unggle Tili',
  firm: 'Gebrüder Bonomo',
  spouses: [s('Ida Jaeger', '1897–1966')],
  children: [
    p('Benedetta', '1927–1991'),
    p('Attilio', '1934–', {
      spouses: [s('Annemarie Hurter'), s('Yvonne Bissig')],
      children: [
        p('Armanda', '1958–', { union: 1 }),
        p('Bianca', '1961–', {
        childSurname: 'Goll', union: 1, children: [p('Seraina', '2001–')] }),
        p('Carmen Maria', '1976–', {
          childSurname: 'Brunner',
          union: 2,
          spouses: [s('Mark Brunner', '19??')],
          children: [p('Max', '2004–'), p('Lou', '2008–')],
        }),
      ],
    }),
  ],
});

const marco1860 = p('Marco fu Matteo', '1860–1930', {
  stammhalter: true,
  nickname: 'Nonno',
  notes: [
    'Einreisen nach Dübendorf: 10.06.1894 – 15.07.1894',
    '10.09.1903 endgültig auf Dübelstein',
    'ab 1911 Grundstrasse',
    'Heirat: 24.01.1885',
    'Ehefrau Barbara: «Nonna, d’Nonne»',
  ],
  spouses: [s('Barbara Carli di Modesto', '1863–192?')],
  children: [matteo1885, umberto1888, ines1891, enrico1893, attilio1896, p('Maria', '1901–1902')],
});

// ---------------------------------------------------------------------------
// Linie Giuseppe Antonio (Anton, 1867–1918) – «Anton Bonomo’s Erben»
// ---------------------------------------------------------------------------

const anton1867 = p('Giuseppe Antonio fu Matteo', '1867–1918', {
  stammhalter: true,
  firm: 'Anton Bonomo’s Erben',
  notes: [
    'Einreise nach Dübendorf: 10.06.1894 – 10.06.1895, Leepünt',
    'Vater von Willi Bonomo',
    'Trat in die Bauunternehmung von Ermengildo Bonaldi ein',
    'Postquittungen belegen Geldsendungen nach Hause schon 1892',
  ],
  spouses: [s('Giuseppa Vogelbacher', '1872–?'), s('Maria Adam')],
  children: [
    p('Eugen', '1896–?', {
      stammhalter: true,
      spouses: [s('Martha Tanner', '1901–1995')],
      children: [
        p('Erich Eugen', '1931–2024', {
          stammhalter: true,
          spouses: [s('Vreni Howald', '1935–')],
          children: [
            p('Claudio', '1962–', {
              spouses: [s('Daniela')],
              children: [
                p('Alessandro', '1995–'),
                p('Giuliana', '1997–', {
                  childSurname: 'Linhart',
                  notes: ['Heirat 2026; heisst seither Linhart'],
                  spouses: [s('Lukas Linhart')],
                  children: [p('Kayla Margot', '2026–')],
                }),
                p('Isabella', '1997–'),
              ],
            }),
            p('Daniela', '1965–', {
              childSurname: 'Kunz',
              spouses: [s('Nik Kunz')],
              children: [p('Fabian', '1990–'), p('Davina', '1994–')],
            }),
          ],
        }),
        p('Maria', '1942–'),
      ],
    }),
    p('Ernst', '1897–1968', {
      stammhalter: true,
      spouses: [s('Herta Bentele', '1904–1990')],
      children: [
        p('Silvio', '1934–2018', {
          stammhalter: true,
          spouses: [s('Vreni Würgler', '1935–1988'), s('Sonia Benakmoume', '1952–')],
          children: [
            p('Marco', '1964–', {
              union: 1,
              spouses: [s('Carmen Bersacola', '1957–')],
              children: [p('Romano', '1995–'), p('Tiziano', '1998–')],
            }),
            p('Reno', '1967–', { union: 1, spouses: [s('Noi', '19..')] }),
            p('Samir Bonomo', '1975–', {
              union: 2,
              spouses: [s('Michelle Alton', '1964–')],
              children: [p('Camilla', '2014–')],
            }),
            p('Michael Benakmoume', '1978–', { union: 2 }),
          ],
        }),
      ],
    }),
    p('Oscar', '1901–1984', {
      stammhalter: true,
      spouses: [s('Renée Guerry', '1901–1992')],
      children: [
        p('Mario', '1933–2024', {
          stammhalter: true,
          spouses: [s('Heidy Nyffenegger', '1935–')],
          children: [
            p('Dario', '1965–2025', { spouses: [s('Mariarosa Bottinelli', '19??–')] }),
            p('Barbara', '1970–'),
            p('Leila', '1970–2007'),
          ],
        }),
      ],
    }),
    p('Willi', '1904–1981', {
      stammhalter: true,
      notes: [
        'Verfasser von «I Bonomo – kurze Einführung in die Geschichte der Familie Bonomo» (1965)',
        'Vortrag an der ersten Familienzusammenkunft am 18.09.1965 in Uetikon',
      ],
      spouses: [s('Georgette Schwyzer', '1916–1962'), s('Lilott Tameling', '1925–')],
      children: [
        p('Irène Maria', '1942–2022', {
          childSurname: 'Rée',
          union: 1,
          spouses: [s('Rup Rée', '1929–2010')],
          children: [
            p('Andreas', '1966–', {
              spouses: [s('Katharina Köpfli', '19??')],
              children: [p('Melvin', '2005–')],
            }),
            p('Lara', '1969–', { spouses: [s('Markus Kronauer', '1962–'), s('Christoph Hiller', '19..–')] }),
          ],
        }),
      ],
    }),
  ],
});

// ---------------------------------------------------------------------------
// Stamm Gallio / Calzin
// ---------------------------------------------------------------------------

export const familyRoot: Person = p('Cristiano', undefined, {
  notes: ['Ältester im Stammbaum genannter Vorfahre'],
  children: [
    p('Gio. Domenico', '1756–1836', {
      notes: ['Laut Willi Bonomo liegt der Stammbaum bis 1756 sicher fest'],
      children: [
        p('Matteo', '1787–1846'),
        p('Marco fu Gio. Domenico', '1792–1855', {
          children: [
            p('Maria Maddalena', '1812–?'),
            p('Gio. Domenico', '1814–1880'),
            p('Cristiano', '1817–1873'),
            p('Barbara', '1820–?'),
            p('Vittore Ant.', '1823–?'),
            p('Matteo fu Marco', '1825–1889', {
              stammhalter: true,
              notes: [
                'Grossvater von Willi Bonomo',
                'Im Befreiungskampf gegen Österreich von den Österreichern gefangen genommen und unter den Bleidächern des Dogenpalastes eingekerkert',
              ],
              spouses: [s('Angela Rigoni')],
              children: [
                p('Marco Giuseppe', '1857–1936'),
                marco1860,
                p('Angela', '1862–1869'),
                p('Antonia', '1865–?'),
                anton1867,
                p('Angela', '1870–?', { notes: ['Einreise nach Dübendorf: 01.04.1896', 'Glätterin, in Leepünt'] }),
                p('Matteo', '1872–1941', { notes: ['Einreise nach Dübendorf: 01.04.1896, Leepünt', 'Maurer, wohnhaft bei Anton'] }),
              ],
            }),
          ],
        }),
        p('Giuseppe', '1803–?'),
        p('Giovanna Maria', '1805–?'),
      ],
    }),
  ],
});

/** Tiefe von Matteo (1825–1889); seine Kinder bilden im Stammbaum die «1. Generation» in Dübendorf. */
export const GENERATION_OFFSET = 4;

export function buildTree(person: Person, depth = 0, path = 'r', parent?: TreeNode): TreeNode {
  const node: TreeNode = { ...person, id: path, depth, parent, children: undefined };
  node.children = person.children?.map((c, i) => buildTree(c, depth + 1, `${path}-${i}`, node));
  return node;
}

export function flatten(node: TreeNode): TreeNode[] {
  return [node, ...(node.children ?? []).flatMap(flatten)];
}

export function generationLabel(node: TreeNode): string | undefined {
  const g = node.depth - GENERATION_OFFSET + 1;
  return g >= 1 ? `${g}. Generation` : undefined;
}
