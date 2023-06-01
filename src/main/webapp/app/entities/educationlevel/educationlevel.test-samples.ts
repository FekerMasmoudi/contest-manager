import { IEducationlevel, NewEducationlevel } from './educationlevel.model';

export const sampleWithRequiredData: IEducationlevel = {
  id: '49121c71-02bc-468f-98db-416e84f76aee',
  rank: 8398,
  designation: 'Prairie Checking transition',
};

export const sampleWithPartialData: IEducationlevel = {
  id: '3619b60c-af42-4237-99c7-ce9d283247bb',
  rank: 70378,
  designation: 'Georgia',
};

export const sampleWithFullData: IEducationlevel = {
  id: '00d2703d-add7-44f8-b48b-6ddf5b80982b',
  rank: 8784,
  designation: 'JBOD',
};

export const sampleWithNewData: NewEducationlevel = {
  rank: 77366,
  designation: 'navigating Cotton microchip',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
