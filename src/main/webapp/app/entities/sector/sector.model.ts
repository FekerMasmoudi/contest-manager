export interface ISector {
  id: string;
  rank?: number | null;
  designation?: string | null;
}

export type NewSector = Omit<ISector, 'id'> & { id: null };
