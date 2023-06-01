import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldcontestform } from '../fieldcontestform.model';

@Component({
  selector: 'jhi-fieldcontestform-detail',
  templateUrl: './fieldcontestform-detail.component.html',
})
export class FieldcontestformDetailComponent implements OnInit {
  fieldcontestform: IFieldcontestform | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldcontestform }) => {
      this.fieldcontestform = fieldcontestform;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
