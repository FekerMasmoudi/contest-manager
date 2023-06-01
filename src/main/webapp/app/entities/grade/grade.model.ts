import { ICertificate } from 'app/entities/certificate/certificate.model';
import { IEducationlevel } from 'app/entities/educationlevel/educationlevel.model';

export interface IGrade {
  id: string;
  code?: number | null;
  designation?: string | null;
  certificate?: Pick<ICertificate, 'id'> | null;
  educationlevel?: Pick<IEducationlevel, 'id'> | null;
}

export type NewGrade = Omit<IGrade, 'id'> & { id: null };
