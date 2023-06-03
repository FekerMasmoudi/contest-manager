import { ICertificate } from 'app/entities/certificate/certificate.model';
import { IEducationlevel } from 'app/entities/educationlevel/educationlevel.model';

export interface IGrade {
  id: string;
  code?: number | null;
  designation?: string | null;
  certificate?: Pick<ICertificate, 'id' | 'designation'> | null;
  educationlevel?: Pick<IEducationlevel, 'id' | 'designation'> | null;
}

export type NewGrade = Omit<IGrade, 'id'> & { id: null };
