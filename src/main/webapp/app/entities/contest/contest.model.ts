import { IContestannounce } from 'app/entities/contestannounce/contestannounce.model';
import { IGrade } from 'app/entities/grade/grade.model';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { ISector } from 'app/entities/sector/sector.model';
import { IContestfield } from '../contestfield/contestfield.model';

export interface IContest {
  id: string;
  code?: number | null;
  rank?: number | null;
  name?: string | null;
  parent?: string | null;
  nbpositions?: number | null;
  status?: boolean | null;
  contestannounce?: Pick<IContestannounce, 'id' | 'announceText'> | null;
  grade?: Pick<IGrade, 'id' | 'designation'> | null;
  speciality?: Pick<ISpeciality, 'id' | 'designation'> | null;
  sector?: Pick<ISector, 'id' | 'designation'> | null;

  contestfields?: IContestfield[] | null;
}

export type NewContest = Omit<IContest, 'id'> & { id: null };
