import { IContestform } from 'app/entities/contestform/contestform.model';
import { etype } from 'app/entities/enumerations/etype.model';

export interface IFieldcontestform {
  id: string;
  fname?: string | null;
  ftype?: etype | null;
  fvalue?: string | null;
  frank?: number | null;
  fsize?: number | null;
  contestform?: Pick<IContestform, 'id'> | null;
}

export type NewFieldcontestform = Omit<IFieldcontestform, 'id'> & { id: null };
