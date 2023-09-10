import { IContest } from 'app/entities/contest/contest.model';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';

export interface Emailinput {
  placeholder?: string | null;
  type?: string | null;
  code?: number | null;
  contestinput?: IContest | null;
  contestfieldinput?: Pick<IContestfield, 'id' | 'cname'> | null;
  positionInput?: DOMRect | null;
  label?: string | null;
}
export type NewContestfield = Omit<Emailinput, 'name'> & { name: null };
