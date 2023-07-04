export interface Modelinput {
  name?: string | null;
  type?: string | null;
}
export type NewContestfield = Omit<Modelinput, 'name'> & { name: null };
