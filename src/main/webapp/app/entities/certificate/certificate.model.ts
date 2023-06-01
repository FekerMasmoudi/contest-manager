export interface ICertificate {
  id: string;
  rank?: number | null;
  designation?: string | null;
}

export type NewCertificate = Omit<ICertificate, 'id'> & { id: null };
