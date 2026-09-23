export interface Spouse {
  name: string;
  life?: string;
  /** "+" im Stammbaum: Partnerschaft ohne Heirat */
  partner?: boolean;
}

export interface Person {
  name: string;
  life?: string;
  /** Übername / Anrede in der Familie, z. B. "Götti/Unggle Matte" */
  nickname?: string;
  /** Im Originalstammbaum hervorgehobene Namensträger (Stammhalter) */
  stammhalter?: boolean;
  /** Firmenname oder Hausname, der mit diesem Zweig verbunden ist */
  firm?: string;
  notes?: string[];
  spouses?: Spouse[];
  /** Nachname der Kinder, im Original als Beschriftung an der Verbindungslinie */
  childSurname?: string;
  /** Bei mehreren Ehen: aus welcher Ehe (1-basiert) das Kind stammt */
  union?: number;
  children?: Person[];
}

export interface TreeNode extends Person {
  id: string;
  depth: number;
  children?: TreeNode[];
  parent?: TreeNode;
}
