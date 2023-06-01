import { ICertificate, NewCertificate } from './certificate.model';

export const sampleWithRequiredData: ICertificate = {
  id: '9d51e6ad-6470-4cdb-86b3-c3d5d6101283',
  rank: 41841,
  designation: 'Pennsylvania',
};

export const sampleWithPartialData: ICertificate = {
  id: '7870bf09-147b-453b-b5de-aac074ad2040',
  rank: 63438,
  designation: 'virtual Supervisor',
};

export const sampleWithFullData: ICertificate = {
  id: '5d135b1a-7cc1-47a3-a8a1-ba2b3caa1519',
  rank: 63139,
  designation: 'user-centric',
};

export const sampleWithNewData: NewCertificate = {
  rank: 69256,
  designation: 'Function-based Rustic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
