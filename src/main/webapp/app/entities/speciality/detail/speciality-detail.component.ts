import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpeciality } from '../speciality.model';

@Component({
  selector: 'jhi-speciality-detail',
  templateUrl: './speciality-detail.component.html',
})
export class SpecialityDetailComponent implements OnInit {
  speciality: ISpeciality | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ speciality }) => {
      this.speciality = speciality;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
