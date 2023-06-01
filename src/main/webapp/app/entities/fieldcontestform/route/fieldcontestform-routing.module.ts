import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldcontestformComponent } from '../list/fieldcontestform.component';
import { FieldcontestformDetailComponent } from '../detail/fieldcontestform-detail.component';
import { FieldcontestformUpdateComponent } from '../update/fieldcontestform-update.component';
import { FieldcontestformRoutingResolveService } from './fieldcontestform-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldcontestformRoute: Routes = [
  {
    path: '',
    component: FieldcontestformComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldcontestformDetailComponent,
    resolve: {
      fieldcontestform: FieldcontestformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldcontestformUpdateComponent,
    resolve: {
      fieldcontestform: FieldcontestformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldcontestformUpdateComponent,
    resolve: {
      fieldcontestform: FieldcontestformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldcontestformRoute)],
  exports: [RouterModule],
})
export class FieldcontestformRoutingModule {}
