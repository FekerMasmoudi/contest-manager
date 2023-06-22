import { IContest } from 'app/entities/contest/contest.model';
import { IUser } from 'app/entities/user/user.model';
import { IContestfield } from '../contestfield/contestfield.model';

export interface IContestform {
  id: string;
  contest?: Pick<IContest, 'id' | 'name'> | null;
  user?: Pick<IUser, 'id' | 'login'> | null;

}

export type NewContestform = Omit<IContestform, 'id'> & { id: null };
