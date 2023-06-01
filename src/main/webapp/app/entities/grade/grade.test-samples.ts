import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: '092b8d81-a1a6-4c1f-82a4-ced53d18d34b',
  code: 13653,
  designation: 'navigate District Branding',
};

export const sampleWithPartialData: IGrade = {
  id: '078aa08f-4d3f-48ab-8504-10116b7173f7',
  code: 53216,
  designation: 'Bedfordshire',
};

export const sampleWithFullData: IGrade = {
  id: '209be22b-aff7-4118-868a-5df1ca987a6d',
  code: 22149,
  designation: 'Washington',
};

export const sampleWithNewData: NewGrade = {
  code: 57186,
  designation: 'PNG Fresh Synchronised',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
