import { ISpeciality, NewSpeciality } from './speciality.model';

export const sampleWithRequiredData: ISpeciality = {
  id: '5b6a3d21-bdf7-443c-8429-78df2d6a0f40',
  rank: 86152,
  designation: 'Avon copying Strategist',
};

export const sampleWithPartialData: ISpeciality = {
  id: 'd9bef7ab-8a92-4928-9ce7-ff98f6cd8a40',
  rank: 92550,
  designation: 'Corporate',
};

export const sampleWithFullData: ISpeciality = {
  id: 'e59fee88-9c18-4946-9184-96f10bb4d92d',
  rank: 62008,
  designation: 'Isle improvement invoice',
};

export const sampleWithNewData: NewSpeciality = {
  rank: 93265,
  designation: 'target',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
