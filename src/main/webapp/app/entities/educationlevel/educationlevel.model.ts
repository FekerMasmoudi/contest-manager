export interface IEducationlevel {
  id: string;
  rank?: number | null;
  designation?: string | null;
}

export type NewEducationlevel = Omit<IEducationlevel, 'id'> & { id: null };
