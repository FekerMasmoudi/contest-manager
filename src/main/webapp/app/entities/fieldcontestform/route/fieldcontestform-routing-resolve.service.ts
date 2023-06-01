import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFieldcontestform } from '../fieldcontestform.model';
import { FieldcontestformService } from '../service/fieldcontestform.service';

@Injectable({ providedIn: 'root' })
export class FieldcontestformRoutingResolveService implements Resolve<IFieldcontestform | null> {
  constructor(protected service: FieldcontestformService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldcontestform | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fieldcontestform: HttpResponse<IFieldcontestform>) => {
          if (fieldcontestform.body) {
            return of(fieldcontestform.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
