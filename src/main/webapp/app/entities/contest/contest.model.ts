import { IContestannounce } from 'app/entities/contestannounce/contestannounce.model';
import { IGrade } from 'app/entities/grade/grade.model';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { ISector } from 'app/entities/sector/sector.model';

export interface IContest {
  id: string;
  code?: number | null;
  rank?: number | null;
  name?: string | null;
  parent?: string | null;
  nbpositions?: number | null;
  status?: boolean | null;
  contestannounce?: Pick<IContestannounce, 'id'> | null;
  grade?: Pick<IGrade, 'id'> | null;
  speciality?: Pick<ISpeciality, 'id'> | null;
  sector?: Pick<ISector, 'id'> | null;
}

export type NewContest = Omit<IContest, 'id'> & { id: null };
