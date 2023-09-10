import { Injectable } from '@angular/core';
import { Modelinput } from '../listfields/inputtext/modelinput';

@Injectable({
  providedIn: 'root',
})
export class ContestformdraggableService {
  constructor() {}

  arrayFields: Modelinput[] = [];
}
