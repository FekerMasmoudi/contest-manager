import { ISector, NewSector } from './sector.model';

export const sampleWithRequiredData: ISector = {
  id: '3aedc306-fac0-4533-99e0-7e3b9b553545',
  rank: 89251,
  designation: 'XSS Steel',
};

export const sampleWithPartialData: ISector = {
  id: '397c2222-996b-49ab-a8d0-dcc8755533c4',
  rank: 2898,
  designation: 'Granite Savings',
};

export const sampleWithFullData: ISector = {
  id: '9e0fc03e-9109-4848-b0d4-73f11e404b8b',
  rank: 22321,
  designation: 'Nebraska schemas',
};

export const sampleWithNewData: NewSector = {
  rank: 37514,
  designation: 'Product',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
