import { IContestfield, NewContestfield } from './contestfield.model';

export const sampleWithRequiredData: IContestfield = {
  id: '35541e9f-02a7-4d9f-94c7-3c9fedc12100',
  reference: 'Concrete',
  ctype: 'override',
  cname: 'mesh',
  logic: 'Oval',
  fopconstraint: 'eyeballs hour',
  fvalue: 'Argentina project',
};

export const sampleWithPartialData: IContestfield = {
  id: '9f29e4f0-469c-4efb-afaf-4c2275f39f0c',
  reference: 'synthesize',
  ctype: 'Nakfa facilitate payment',
  cname: 'fresh-thinking Persevering',
  logic: 'FTP Handcrafted',
  fopconstraint: 'Generic programming Vermont',
  fvalue: 'Ergonomic drive',
  sopconstraint: 'Communications emulation',
};

export const sampleWithFullData: IContestfield = {
  id: 'f0c8d92d-fd6e-4f32-8cc7-b06afc6d8ed1',
  mandatory: false,
  reference: 'copying withdrawal',
  ctype: 'JSON SSL markets',
  cname: 'Assistant strategize target',
  logic: 'Bedfordshire',
  fopconstraint: 'Clothing Account',
  fvalue: 'monitor',
  sopconstraint: 'Principal',
  svalue: 'infrastructures',
};

export const sampleWithNewData: NewContestfield = {
  reference: 'generating deposit',
  ctype: 'Specialist quantifying',
  cname: 'Architect Baby Engineer',
  logic: 'haptic',
  fopconstraint: 'Engineer streamline',
  fvalue: 'Division Granite',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
