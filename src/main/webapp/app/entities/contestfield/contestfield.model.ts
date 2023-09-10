import { IContest } from 'app/entities/contest/contest.model';

export interface IContestfield {
  id: string;
  mandatory?: boolean | null;
  reference?: string | null;
  ctype?: string | null;
  cname?: string | null;
  logic?: string | null;
  fopconstraint?: string | null;
  fvalue?: string | null;
  sopconstraint?: string | null;
  svalue?: string | null;
  contest?: Pick<IContest, 'id' | 'name'> | null;
}

export type NewContestfield = Omit<IContestfield, 'id'> & { id: null };
