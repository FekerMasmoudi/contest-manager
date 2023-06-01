export interface ISpeciality {
  id: string;
  rank?: number | null;
  designation?: string | null;
}

export type NewSpeciality = Omit<ISpeciality, 'id'> & { id: null };
