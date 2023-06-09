import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISector } from '../sector.model';
import { SectorService } from '../service/sector.service';

@Injectable({ providedIn: 'root' })
export class SectorRoutingResolveService implements Resolve<ISector | null> {
  constructor(protected service: SectorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISector | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sector: HttpResponse<ISector>) => {
          if (sector.body) {
            return of(sector.body);
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
