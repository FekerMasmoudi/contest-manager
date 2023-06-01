import { IContest, NewContest } from './contest.model';

export const sampleWithRequiredData: IContest = {
  id: '83c83c71-dde1-4d84-9f90-443d30771c0d',
  code: 88341,
  rank: 76365,
  name: 'THX indexing',
  parent: 'copy',
  nbpositions: 25619,
};

export const sampleWithPartialData: IContest = {
  id: '996ccecf-740e-4b12-a24e-16026765cf95',
  code: 33358,
  rank: 84502,
  name: 'white Crescent',
  parent: 'parsing Euro',
  nbpositions: 76822,
};

export const sampleWithFullData: IContest = {
  id: 'fe3ca2c8-13db-4c7e-b212-ba1e4e1ede2c',
  code: 30567,
  rank: 55928,
  name: 'fault-tolerant',
  parent: 'Switchable magenta calculate',
  nbpositions: 12742,
  status: false,
};

export const sampleWithNewData: NewContest = {
  code: 51851,
  rank: 46168,
  name: 'Fish',
  parent: 'gold',
  nbpositions: 60917,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
