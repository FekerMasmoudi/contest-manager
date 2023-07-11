import { IContest } from 'app/entities/contest/contest.model';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';

export interface Modelinput {
  name?: string | null;
  type?: string | null;
  code?: string | null;
  contestinput?: IContest | null;
  contestfieldinput?: Pick<IContestfield, 'id' | 'cname'> | null;
}
export type NewContestfield = Omit<Modelinput, 'name'> & { name: null };
