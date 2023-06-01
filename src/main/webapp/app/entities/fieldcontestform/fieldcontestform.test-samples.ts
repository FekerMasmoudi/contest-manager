import { etype } from 'app/entities/enumerations/etype.model';

import { IFieldcontestform, NewFieldcontestform } from './fieldcontestform.model';

export const sampleWithRequiredData: IFieldcontestform = {
  id: '20d73442-61ea-421b-92c6-c1bdef2a5086',
  fname: 'Andorra navigating optical',
  ftype: etype['STRING'],
};

export const sampleWithPartialData: IFieldcontestform = {
  id: '4e932dc1-d4b2-4f28-bbf4-4fb702c5c8a2',
  fname: 'protocol',
  ftype: etype['FLOAT'],
  fvalue: 'Belarussian',
};

export const sampleWithFullData: IFieldcontestform = {
  id: '73bb5582-a006-4e52-90f9-30f9ce6215d9',
  fname: 'Implementation Program',
  ftype: etype['STRING'],
  fvalue: 'Iowa',
  frank: 38585,
  fsize: 72416,
};

export const sampleWithNewData: NewFieldcontestform = {
  fname: 'Chips Home',
  ftype: etype['STRING'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
