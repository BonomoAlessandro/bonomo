/*
 * Nacherzählt nach Willi Bonomo, «I Bonomo – kurze Einführung in die Geschichte der Familie Bonomo»,
 * Vortrag an der ersten Familienzusammenkunft am 18. September 1965 in Uetikon,
 * sowie dem beiliegenden Neujahrsbrief aus Meilen vom 27. Dezember 1979.
 * Alle Angaben folgen der Quelle; offensichtliche Schreibfehler der Originalauflage sind korrigiert
 * (Attila: 492 → 452, Seligsprechung Giovanna Maria: 1883 → 1783).
 */

export interface Chapter {
  id: string;
  era: string;
  place: string;
  title: string;
  paragraphs: string[];
  quote?: { text: string; source: string };
  facts?: { label: string; value: string }[];
}

export const chapters: Chapter[] = [
  {
    id: 'name',
    era: '1. Jahrtausend',
    place: 'Der Name',
    title: 'Bonus homo',
    paragraphs: [
      'Im ersten christlichen Jahrtausend trug man in der Regel nur einen einzigen Namen. Die Namen wurden mit Vorliebe nach äusseren Eigenschaften gegeben, die Grösse, Kraft, Kühnheit, Adel, Wehr und Waffen, Kampf und Sieg andeuteten – doch kamen darin auch Klugheit, Treue, Güte und Ehre zum Ausdruck, wie es für die Familie Bonomo zutrifft. Auf der ältesten Inschrift, die auf den Bestand der Familie hinweist, steht der Name BONUS HOMO ET TU.',
      'Daraus leiten sich die Schreibweisen Buonushomo, Buon und Bonomo sowie das latinisierte Bonhomini ab. Im 10. Jahrhundert begann man, gleichnamige Leute durch einen Zunamen zu unterscheiden. Weil dabei oft auch der Geschlechtsname wieder verwendet wurde, finden sich sehr oft Familienmitglieder, die «Bonomo Bonomo» heissen; öfters wurde auch «Bonhomo Bonomo» geschrieben.',
      'Für die Familienforschung in Italien ist es von ausserordentlichem Wert, dass schon zu frühesten Zeiten jedem Personennamen der Vorname des Vaters beigefügt wurde – etwa «Matteo fu Marco». Weil die Bonomo in Urkunden und Testamenten, oft als Zeugen, jeweils mit dem Vornamen des Vaters vermerkt sind, lässt sich der Stammbaum wie in einem Zusammensetzspiel erstellen, auch wo Kirchenbücher durch Kriege zerstört oder verloren sind.',
    ],
    quote: {
      text: 'Gewiss mag es erhebend sein, auf vornehme, verdiente Ahnen hinweisen zu können, in erster Linie aber kommt es darauf an, was wir selber sind und leisten.',
      source: 'Willi Bonomo, 1965',
    },
  },
  {
    id: 'venedig',
    era: 'um 1000 – 1648',
    place: 'Venedig',
    title: 'Unter den ersten Familien der Lagune',
    paragraphs: [
      'Über die ursprüngliche Herkunft der Familie vor dem Jahr 990 weiss man nichts Genaues. Willi Bonomo nahm an, dass die Vorfahren in einer der alten römischen Städte an der Adria beheimatet waren, vor allem im alten Altinum an der Stelle des heutigen Mestre. Aquileia und Altinum wurden durch die Hunnen unter Attila im Jahre 452 zerstört. Die Bevölkerung von Altinum flüchtete sich auf die vorgelagerten Inseln, die Lagunen, die nach und nach überbaut wurden und das heutige Venedig bilden.',
      'Um das Jahr 1000 befand sich die Familie Bonomo unter den vornehmsten Familien Venedigs; sie war eine der ersten, die sich auf den Lagunen ansiedelte. Auf einem alten Stammbaum findet sich als erster Vertreter ein Bonhomo Bonomi im Jahre 1000. Um 1297 sass ein Bonomo im Rat der Stadt unter dem Dogen Gradenigo. Aus den Jahren 1384 und 1385 ist der Maler Jacobello Bonomo bezeugt; von ihm ist eine einzige, eigenhändig signierte Arbeit erhalten, ein Altarbild.',
      'Der vornehme Stamm der venezianischen Bonomo ist kurz nach 1300 ausgestorben, weitere Angehörige blieben jedoch zahlreich. Der heutige Palazzo Albrizzi war bis 1648 der Palazzo der Familie Bonomo; in zwei Käufen, 1648 und 1672, ging er gänzlich an die Familie Albrizzi über. Die ältesten Wappen der Familie sind aus Venedig erhalten: jene mit dem griechischen Kreuz und den vier Buchstaben B.',
      'Ein Neujahrsbrief aus Meilen vom 27. Dezember 1979 berichtet zudem: Pietro Lombardo, Direktor der Unterhaltung des Dogenpalastes, der Procuratie Vecchie und des Uhrturms, habe bei Renovationsarbeiten Dokumente gefunden, wonach Bartolomeo Bonomo – in alter Schreibweise «Bon o Buono» – der Erbauer des Uhrturms (Torre dell’Orologio) war. Als Chef des Bauwesens sei er auch für den Bau der Procuratie Vecchie verantwortlich gewesen.',
    ],
  },
  {
    id: 'triest',
    era: '1200 – 1500',
    place: 'Triest',
    title: 'Eine der dreizehn Casate',
    paragraphs: [
      'Voraussichtlich musste ein Zweig der Familie während der innenpolitischen Wirren unter Kaiser Otto II. um das Jahr 1000 Venedig verlassen und siedelte sich in Triest an. Als Stammvater der Triestiner Bonomo erscheint um 1200 Pietro Bonomo. Am 2. Februar 1246 konstituierte sich in Triest die «Brüderschaft der Vornehmen», die in der Folge die höchsten Ämter in Regierung, Verwaltung und Kirche besetzte. Aufgenommen werden konnte nur, wer einer der dreizehn vornehmsten Familien, der «casate», angehörte. Eine davon war die Familie Bonomo.',
      'Die Familie hatte sehr grossen Grundbesitz in Triest und insbesondere in Dalmatien, betätigte sich schon früh im Bankwesen und war an Handelsunternehmungen beteiligt. Gerichtsakten aus dem 15. Jahrhundert, als die Bonomo in Triest zu grosser Macht gekommen waren, geben Einblick in das private Leben – die Handelsbeziehungen zu Venedig gingen dabei unberührt von den kriegerischen Ereignissen weiter. In einem Prozess vom 12. Januar 1401 wird erwähnt, dass die Bankiers Abramo und David Bonomo von Nürnberg zurückgekommen seien und rund 2600 Golddukaten an verschiedene Bürger von Triest verteilt hätten. Ein Bonomo Bonomo, Sohn des Lazzaro – nicht zu verwechseln mit dem gleichnamigen Sohn Antonios im folgenden Kapitel –, war beim Tod seines Vaters erst 18 Jahre alt und musste das väterliche Handelsgeschäft weiterführen. Am 15. Juni 1484 klagte er gegen Marco Callolli, Bürger von Triest, dem seine Mutter 20 Golddukaten und 2000 Pfund Honig für gemeinsame Geschäfte ausgehändigt hatte. Im selben Jahr wurde er auf dem Markt von Venedig verhaftet, weil Kerzen, die er in Kommission verkaufte, Mindergewicht aufwiesen.',
      'Eine bedeutende Gestalt war Francesco Corvo Bonomo, der von 1380 bis 1416 an der Macht war. Am 8. August 1368 wurde er mit anderen Triestinern als Unterhändler nach Venedig gesandt, um einen Frieden zu vereinbaren. 1370 war er Gesandter seiner Heimatstadt in Venedig und heiratete dort eine Verwandte des damaligen Dogen; er starb 1416 reich begütert. Auf ihn geht wohl der Rabe (corvo) als Helmzier im Triestiner Stammwappen zurück: der silbernen Treppe auf rotem Grund, zu der mit der Grafenwürde die goldene Krone kam. In Triest erinnert eine Strasse mit dem Namen der Familie an den ehemaligen Sitz des Stammes.',
    ],
  },
  {
    id: 'revolution',
    era: '1468 – 1470',
    place: 'Triest',
    title: 'Der Tumult von Triest',
    paragraphs: [
      'Zwischen Venedig und dem kaiserlichen Triest bestand ein langer Konflikt, und die Bevölkerung von Triest spaltete sich in eine kaiserliche und eine venezianische Partei. Zum Unglück der Familie wurde Antonio Bonomo, unterstützt von seinem Sohn Bonomo Bonomo und seinem Bruder Francesco, Chef der venezianischen Partei. Chef der kaiserlichen Partei wurde hingegen Gian Antonio Bonomo, Kommandant der städtischen Milizen.',
      'Antonio liebte die Freiheit, noch mehr aber seine Vaterstadt. Er sah ein, dass Triest nicht allein gegen den Kaiser bestehen konnte, und riet dem Rat, sich an Venedig anzulehnen. Der Triestiner Staatsanwalt Christoforo Bonomo zog mit zwölf vornehmen Bürgern nach Venedig, um den Schlüssel der Stadt zu überreichen und um ein Bündnis zu bitten, doch Venedig nahm das Angebot nicht an. Am 15. August 1468 liess Antonio Sturm läuten. Die Volkserhebung artete zu einem Kampf innerhalb der Familie aus: Fünfzehn der wichtigsten Anhänger des Kaisers, darunter Gian Antonio Bonomo, wurden am Rathaus von Triest erhängt.',
      'Elf Monate später standen 3000 Kaiserliche vor den Toren. Auf dem Hügel von Ponziano wurde die letzte Schlacht um die Freiheit der Stadt geschlagen, in der beinahe alle Führer den Tod fanden. Auf dem Hauptplatz wurden viele Edle enthauptet, unter ihnen Stefano Bonomo. Antonio und der grösste Teil der venezianischen Partei flüchteten nach Istrien, Venedig und in venezianische Gebiete wie Asiago; ein Senatsbeschluss Venedigs gewährte den Flüchtlingen 1469 Unterstützung. 1470 kam Kaiser Friedrich III. selbst nach Triest, um Gericht zu halten. Antonio wurde zum Tod durch Enthaupten verurteilt; die Flüchtlinge – darunter Christoforo, Bonomo Bonomo, Giusto, Odorico und Gian Giacomo Bonomo – wurden aus den kaiserlichen Landen verbannt.',
      'Bonomo Bonomo und sein Sohn Giovanni hatten sich in die Berge von Asiago geflüchtet. Von diesem Stamm Asiago stammen wir alle ab.',
    ],
    quote: {
      text: 'Antonio Bonomo, Sieger der triestinischen Revolution, ist eine der stärksten Persönlichkeiten der Geschichte der Stadt Triest.',
      source: 'Willi Bonomo, 1965',
    },
  },
  {
    id: 'kaisertreue',
    era: '1470 – 1860',
    place: 'Triest & Wien',
    title: 'Der kaisertreue Zweig',
    paragraphs: [
      'Nach dem Gericht Friedrichs III. kam der kaisertreue Familienzweig zu höchsten Ehren. Pietro Bonomo (1458–1546), Sohn des 1468 von den eigenen Verwandten gehängten Gian Antonio, wurde einer der berühmtesten Triestiner aller Zeiten. Er war eng mit Kaiser Friedrich III. befreundet und wurde nach dessen Tod Sekretär Kaiser Maximilians. Obwohl verheiratet und Vater eines Sohnes, trat er 1492 nach damaliger Sitte in den Priesterstand ein; 1501 wurde er Bischof von Triest und 1521 Erzkanzler Kaiser Karls V. Bevor er im hohen Alter von 88 Jahren starb, nahm er den protestantischen Glauben an – und wurde dennoch mit höchsten kirchlichen Ehren im Dom von Triest beigesetzt.',
      'Die Familie stellte höchste politische Würdenträger, Statthalter in Dalmatien, Istrien und der Krain, zahlreiche Wissenschaftler und Gelehrte und vor allem Militärs: Während dreihundert Jahren finden sich Angehörige in höchsten militärischen Rängen. Francesco Saverino (1718–1787) war Genieoberst, Christoforo Pietro (1754–1811) Generalkommissar der k. k. Marine. Francesco Maria Bonomo, einer der letzten der Triestiner Sippe, wurde Generalmajor der k. k. Armee in Wien, im Mai 1845 von Kaiser Ferdinand I. in den Adelsstand erhoben, und starb 1850 in Wien. Nur zehn Jahre später erlosch der Hauptstamm in Triest, der während 850 Jahren das politische Leben der Stadt stark beeinflusst hatte.',
    ],
  },
  {
    id: 'asiago',
    era: '1469 – 1916',
    place: 'Asiago · Sette Comuni',
    title: 'Neubeginn in Asiago',
    paragraphs: [
      'Asiago gehörte damals zur Republik Venedig, sodass die Flüchtlinge dort vor jeder Nachstellung sicher waren. Bonomo Bonomo lebte sehr zurückgezogen und hielt sich bewusst von politischen Intrigen fern. Die «Bonomosippe» fasste rasch Fuss und wurde in verhältnismässig kurzer Zeit eine der einflussreichsten Familien der sogenannten Sette Comuni. Im Jahre 1498 liess Kaiser Friedrich III. Gnade über die Verbannten von 1470 walten; Bonomo Bonomo kehrte wohl nochmals nach Triest zurück, um seine Verhältnisse zu regeln, hatte aber schon zu starke Wurzeln in Asiago geschlagen, um dort zu bleiben.',
      'Die Familie in Asiago vergrösserte sich stark, sodass sich schon um 1530 Teile in den umliegenden Orten wie Gallio und Camporovere ansiedelten. Die Hauptfamilie in Asiago wurde sehr reich und übte grossen politischen Einfluss aus; Angehörige der Familie wurden Regierungsstatthalter für Venedig. Viele studierten Rechtswissenschaften, Medizin oder Theologie oder wurden Dichter und Schriftsteller. 1603 spalteten sich die Bonomo von Este ab, vorwiegend Juristen und Professoren.',
      'Als die Familie aus Triest flüchten musste und Zuflucht in Asiago nahm, wechselte sie auch das Wappen. Sie behielt die Stammesfarben Rot und Blau, nahm aber einen springenden Stier auf, um ihre Verbundenheit mit Grund und Boden zu dokumentieren. Ausser dem Stier wurde oft das Hauszeichen im Wappen mitgeführt.',
    ],
  },
  {
    id: 'giovanna',
    era: '1606 – 1670',
    place: 'Asiago & Bassano',
    title: 'Die selige Giovanna Maria Bonomo',
    paragraphs: [
      'Aus dem Stamm Asiago ging die selige Giovanna Maria Bonomo (1606–1670) hervor, die eine zentrale Stellung in der Familiengeschichte einnimmt. Sie muss eine aussergewöhnliche Frau gewesen sein: Schon zu Lebzeiten erregte sie die Gemüter ihrer Mitbürger und ihrer kirchlichen Vorgesetzten durch ihre ausstrahlende Persönlichkeit, ihre Tugenden und vor allem ihre Askese, die in einer vorübergehenden Stigmatisation ihren höchsten Ausdruck fand. Sie wurde von regierenden Kreisen um Rat angegangen; aus ihren erhaltenen Briefen spricht Intelligenz, gepaart mit Güte, Strenge und Ehrlichkeit.',
      'Fünfzehn Jahre nach ihrem Tod erschien eine erste Biografie; das wichtigste Werk ist jenes von P. Luigi da Vincenza aus dem Jahre 1798 mit den Akten des Seligsprechungsprozesses. Seliggesprochen wurde sie 1783; 1965 waren Bestrebungen für ihre Heiligsprechung im Gange. In der Klosterkirche zu Bassano ist sie in einem Glassarg auf dem Altar einer Seitenkapelle aufgebahrt. Zwei Denkmäler in Asiago, ihrem Geburtsort, und Bassano, ihrem Sterbeort, überstanden die Invasion von 1916 – dass die feindlichen Truppen damals bei Asiago und Bassano stehen blieben, erklärt die grosse Verehrung, die sie als Schutzpatronin in Oberitalien geniesst.',
    ],
    quote: {
      text: 'Die Frucht des Geistes aber ist Liebe, Freude, Friede, Geduld, Milde, Güte, Langmut, Treue, Mässigkeit, Enthaltsamkeit und Keuschheit.',
      source: 'Paulus an die Galater – mit diesen Worten umschrieb Willi Bonomo ihre Persönlichkeit',
    },
  },
  {
    id: 'calzin',
    era: '1520 – 1918',
    place: 'Gallio',
    title: '«Calzini» – die Kalker',
    paragraphs: [
      'Die beiden 1965 anwesenden Familien Bonomo in der Schweiz – der Stamm Gallio und der Stamm Camporovere – gehen auf denselben Stammvater zurück: Domenico fu Giovanni, der sich um 1520 in Gallio niederliess; ein Nachfahre von ihm siedelte sich in Camporovere an. Beide Gemeinden gehörten zu den Sette Comuni. Die Familien in Gallio und Camporovere nahmen nicht den glänzenden Wiederaufstieg wie der Hauptstamm zu Asiago; es waren eher bescheidene Leute, vorwiegend in der Landwirtschaft tätig.',
      'Der Stamm Gallio bekam schon bald, bestimmt aber um 1700, den Übernamen «die Calzini» (im Stammbaum «Calzin»). Er bedeutet, dass sie sogenannte Kalker waren, Leute, die Kalk brannten und verarbeiteten und sich also mit dem Bauen beschäftigten. Wenn die Familien in Zürich und Umgebung das Bauhandwerk ergriffen, so traten sie nur in die Fussstapfen ihrer Vorfahren. Weitere Übernamen von Bonomo-Familien in Asiago sind etwa Belo, Trip, Mesnar und Ceple.',
      'Der Stammbaum liegt sicher fest bis zurück ins Jahr 1756; die Lücke bis 1530 muss die Forschung noch schliessen. 1848/49 erhob sich Oberitalien gegen die Fremdherrschaft der Habsburger, zehn Jahre später folgten die Befreiungsschlachten von Solferino und Magenta; die Bonomo von Asiago nahmen lebhaften Anteil an diesem Befreiungskampf. Matteo (1825–1889), Grossvater von Willi Bonomo, wurde von den Österreichern gefangen genommen und unter den Bleidächern des Dogenpalastes eingekerkert. Im Ersten Weltkrieg stürmten die Österreicher im Frühling 1916 das Hochplateau und eroberten am 31. Mai Asiago. Asiago sank in Schutt und Trümmer, Kirchen und Archive wurden ein Raub der Flammen.',
    ],
    quote: {
      text: 'Aber auch diesmal, wieder wie immer während der vergangenen 1000 Jahre, verloren die Bonomo Hab und Gut. Aber wieder fanden sie die Kraft, sich zu erheben und nach oben zu arbeiten.',
      source: 'Willi Bonomo, 1965',
    },
  },
  {
    id: 'duebendorf',
    era: 'ab 1877',
    place: 'Dübendorf',
    title: 'Ankunft in Dübendorf',
    paragraphs: [
      'Am 10. März 1877 trafen als erste Bonomo Giuseppe (1851) und seine Schwester Domenica in Dübendorf ein. Sie liessen sich im Haus «zur Rose» an der Zürichstrasse nieder, wo Giuseppe eine Fuhrhalterei betrieb. Nach mündlicher Überlieferung arbeitete der Fuhrhalter Bonomo lange auf eigene Rechnung, war sehr geachtet und wurde von der einheimischen Bevölkerung mit «Gutmann» angeredet. 1879 kamen Christian und Pietro Rigoni nach Dübendorf; sie waren sehr eng mit den Bonomo verwandt – die gemeinsame Grossmutter war eine geborene Rigoni – und stammten ebenfalls aus Asiago.',
      'Mit dem Jahr 1894 beginnt die Sesshaftigkeit der Bonomo in Dübendorf. Am 10. Juni 1894 nahm Anton (Giuseppe Antonio, 1867–1918), der Vater von Willi Bonomo, dort für immer Wohnsitz und trat in die Bauunternehmung von Ermengildo Bonaldi ein. Postquittungen über 300 und 350 Franken, die er schon 1892 nach Hause schickte, zeigen, dass er bereits früher hier gearbeitet haben muss. Mit ihm kam sein Bruder Marco (1860–1930) zum ersten Mal nach Dübendorf, verreiste aber nach einem Monat wieder; am 10. September 1903 liess er sich endgültig auf Dübelstein nieder und zog später seine Familie aus Italien nach. Am 1. April 1896 kamen mit Matteo und Angela zwei weitere Geschwister von Anton und Marco nach Dübendorf.',
      'Von Marco und Anton stammen die Dübendorfer Linien des Stammbaums ab. Dort sind auch die Firmen der Familie verzeichnet – «Marco Bonomo Söhne», «Gebrüder Bonomo» (Enrico und Attilio), «Umberto Bonomo Söhne» (ab 1949) und «Anton Bonomo’s Erben» – sowie die Hausnamen an der Grundstrasse: «Die d’obe» (Nr. 5), «Die d’une» und «Die d’äne» (Nr. 15).',
    ],
    facts: [
      { label: '10.03.1877', value: 'Giuseppe und Domenica Bonomo, «zur Rose»' },
      { label: '10.06.1894', value: 'Anton Bonomo, Maurer, Leepünt' },
      { label: '01.04.1896', value: 'Matteo und Angela Bonomo' },
      { label: '10.09.1903', value: 'Marco Bonomo, endgültig auf Dübelstein' },
      { label: '13.08.1906', value: 'Umberto Bonomo, Dübelstein' },
      { label: '16.04.1914', value: 'Einbürgerung von Umberto' },
    ],
  },
  {
    id: 'spuren',
    era: '1500 – 1965',
    place: 'Weitere Spuren',
    title: 'Offene Fährten',
    paragraphs: [
      'Von etwa 1500 bis zu ihrem Aussterben um 1830 lebte im Engadin eine zeitweise sehr begüterte Familie Bonomo. Sie trat unvermittelt in die Engadiner Geschichte, besass ausserordentlichen Grundbesitz und verschwägerte sich bald mit den Familien von Planta, Frizzoni, Castelmur, von Albertini und von Salis. Als Stammvater gilt Jachiam Bonomo, 1527 in Celerina beglaubigt. Zum Gedenken an einen protestantischen Pfarrer Bonomo, gestorben 1830 in Bevers, wurde an der dortigen Kirche eine Gedenktafel angebracht. Willi Bonomo fragte, ob auch dieser Stamm auf Flüchtlinge aus Triest zurückgehe – bewiesen ist das nicht.',
      'Francesco Bonhomini, Bischof von Vercelli, war von 1578 bis 1581 päpstlicher Nuntius in der Schweiz; von ihm sind über 1000 Briefe erhalten, die einen einzigartigen Einblick in das damalige soziale, wirtschaftliche und politische Leben geben. Alle genealogischen Hinweise deuten laut Willi Bonomo mit grösster Sicherheit darauf hin, dass er zur Familie gehört, bewiesen war es 1965 aber noch nicht; der Neujahrsbrief von 1979 nennt Akten, die von einem «magnificum dominum Bonomo doctorem» sprechen, und Hinweise auf eine Herkunft aus dem Raum Venedig–Padua–Asiago.',
      'Durch eine Leserantwort im «Nebelspalter» erfuhr Willi Bonomo, dass der Arzt Cosimo Bonomo 1687 eine erste wissenschaftliche Arbeit über die Filzlaus verfasst und in einem Brief dem Gelehrten Francesco Redi in Pisa übersandt hatte. Als ein Buch mit diesem Brief in New York zur Auktion kam, erwarb Willi Bonomo es für 1000 Franken. Und in Rom sass er einmal mit Riccardo Bonomo, einem in Amerika bekannt gewordenen Panzerwagenfabrikanten aus der Gegend von Neapel, beim Tee – die Familienähnlichkeit sei frappant gewesen.',
    ],
    quote: {
      text: 'Abschliessend möchte ich betonen, dass ich der Meinung bin, dass wir erst am Anfange unserer Familienforschung stehen.',
      source: 'Willi Bonomo, 1965',
    },
  },
];

export interface TimelineEvent {
  year: string;
  text: string;
  chapter: string;
}

export const timeline: TimelineEvent[] = [
  { year: 'um 1000', text: 'Die Bonomo unter den vornehmsten Familien Venedigs', chapter: 'venedig' },
  { year: '1246', text: 'Eine der dreizehn Casate in der Brüderschaft der Vornehmen von Triest', chapter: 'triest' },
  { year: '1368', text: 'Francesco Corvo Bonomo als Unterhändler in Venedig', chapter: 'triest' },
  { year: '1468', text: 'Tumult von Triest unter Antonio Bonomo', chapter: 'revolution' },
  { year: '1469/70', text: 'Flucht nach Asiago; Gericht Kaiser Friedrichs III. und Verbannung', chapter: 'revolution' },
  { year: '1501', text: 'Pietro Bonomo wird Bischof von Triest', chapter: 'kaisertreue' },
  { year: 'um 1520', text: 'Domenico fu Giovanni in Gallio', chapter: 'calzin' },
  { year: '1606', text: 'Geburt der seligen Giovanna Maria Bonomo', chapter: 'giovanna' },
  { year: '1648', text: 'Palazzo Bonomo in Venedig geht an die Albrizzi', chapter: 'venedig' },
  { year: '1756', text: 'Ab hier liegt der Stammbaum sicher fest', chapter: 'calzin' },
  { year: '1877', text: 'Erste Bonomo in Dübendorf', chapter: 'duebendorf' },
  { year: '1894', text: 'Anton und Marco Bonomo in Dübendorf', chapter: 'duebendorf' },
  { year: '1916', text: 'Eroberung und Zerstörung von Asiago im Ersten Weltkrieg', chapter: 'calzin' },
  { year: '1965', text: 'Erste Familienzusammenkunft in Uetikon', chapter: 'name' },
];
