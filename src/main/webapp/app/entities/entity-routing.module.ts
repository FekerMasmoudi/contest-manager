import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'generalrules',
        data: { pageTitle: 'contestmanagerdbApp.generalrules.home.title' },
        loadChildren: () => import('./generalrules/generalrules.module').then(m => m.GeneralrulesModule),
      },
      {
        path: 'contestannounce',
        data: { pageTitle: 'contestmanagerdbApp.contestannounce.home.title' },
        loadChildren: () => import('./contestannounce/contestannounce.module').then(m => m.ContestannounceModule),
      },
      {
        path: 'sector',
        data: { pageTitle: 'contestmanagerdbApp.sector.home.title' },
        loadChildren: () => import('./sector/sector.module').then(m => m.SectorModule),
      },
      {
        path: 'speciality',
        data: { pageTitle: 'contestmanagerdbApp.speciality.home.title' },
        loadChildren: () => import('./speciality/speciality.module').then(m => m.SpecialityModule),
      },
      {
        path: 'educationlevel',
        data: { pageTitle: 'contestmanagerdbApp.educationlevel.home.title' },
        loadChildren: () => import('./educationlevel/educationlevel.module').then(m => m.EducationlevelModule),
      },
      {
        path: 'certificate',
        data: { pageTitle: 'contestmanagerdbApp.certificate.home.title' },
        loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule),
      },
      {
        path: 'grade',
        data: { pageTitle: 'contestmanagerdbApp.grade.home.title' },
        loadChildren: () => import('./grade/grade.module').then(m => m.GradeModule),
      },
      {
        path: 'contest',
        data: { pageTitle: 'contestmanagerdbApp.contest.home.title' },
        loadChildren: () => import('./contest/contest.module').then(m => m.ContestModule),
      },
      {
        path: 'contestfield',
        data: { pageTitle: 'contestmanagerdbApp.contestfield.home.title' },
        loadChildren: () => import('./contestfield/contestfield.module').then(m => m.ContestfieldModule),
      },
      {
        path: 'contestform',
        data: { pageTitle: 'contestmanagerdbApp.contestform.home.title' },
        loadChildren: () => import('./contestform/contestform.module').then(m => m.ContestformModule),
      },
      {
        path: 'fieldcontestform',
        data: { pageTitle: 'contestmanagerdbApp.fieldcontestform.home.title' },
        loadChildren: () => import('./fieldcontestform/fieldcontestform.module').then(m => m.FieldcontestformModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
