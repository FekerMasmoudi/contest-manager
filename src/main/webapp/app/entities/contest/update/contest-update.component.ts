import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContestFormService, ContestFormGroup } from './contest-form.service';
import { IContest } from '../contest.model';
import { ContestService } from '../service/contest.service';
import { IContestannounce } from 'app/entities/contestannounce/contestannounce.model';
import { ContestannounceService } from 'app/entities/contestannounce/service/contestannounce.service';
import { IGrade } from 'app/entities/grade/grade.model';
import { GradeService } from 'app/entities/grade/service/grade.service';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { SpecialityService } from 'app/entities/speciality/service/speciality.service';
import { ISector } from 'app/entities/sector/sector.model';
import { IContestfield, NewContestfield } from 'app/entities/contestfield/contestfield.model';
import { SectorService } from 'app/entities/sector/service/sector.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContestfieldFormGroup, ContestfieldFormService } from 'app/entities/contestfield/update/contestfield-form.service';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { ContestfieldUpdateComponent } from 'app/entities/contestfield/update/contestfield-update.component';

@Component({
  selector: 'jhi-contest-update',
  templateUrl: './contest-update.component.html',
})
export class ContestUpdateComponent implements OnInit {
  @ViewChild(ContestfieldUpdateComponent) y!: ContestfieldUpdateComponent;

  //Modifed By Mohamed
  /*line: IContestfield = { 
	  
	  id : '' ,
      cname: '',
      mandatory: false,
      reference: '',
      ctype: '',
      logic: '',
      fopconstraint: '',
      fvalue: '',
      sopconstraint: '',
      svalue: '',
      
      
    }; */

  //fields!: FormControl<IContest['contestfields']>  ;

  //line = FormControl<IContest['contestfields']>;

  contestfieldsLines: IContestfield[] = [];
  //contestfieldsLines1: IContestfield|NewContestfield [] = [];
  //contestfieldsLines2: any [] = [];
  //contestfieldsLines: FormControl<IContest['contestfields']> [] = [];

  isSaving = false;
  contest: IContest | null = null;

  contestfield: IContestfield | null = null;

  contestannouncesSharedCollection: IContestannounce[] = [];
  gradesSharedCollection: IGrade[] = [];
  specialitiesSharedCollection: ISpeciality[] = [];
  sectorsSharedCollection: ISector[] = [];

  editForm: ContestFormGroup = this.contestFormService.createContestFormGroup();

  //editCfForm: ContestfieldFormGroup = this.contestfieldFormService.createContestfieldFormGroup();

  constructor(
    protected contestService: ContestService,
    protected contestFormService: ContestFormService,
    protected contestannounceService: ContestannounceService,
    protected gradeService: GradeService,
    protected specialityService: SpecialityService,
    protected sectorService: SectorService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected contestfieldFormService: ContestfieldFormService,
    protected contestfieldService: ContestfieldService
  ) {}

  compareContestannounce = (o1: IContestannounce | null, o2: IContestannounce | null): boolean =>
    this.contestannounceService.compareContestannounce(o1, o2);

  compareGrade = (o1: IGrade | null, o2: IGrade | null): boolean => this.gradeService.compareGrade(o1, o2);

  compareSpeciality = (o1: ISpeciality | null, o2: ISpeciality | null): boolean => this.specialityService.compareSpeciality(o1, o2);

  compareSector = (o1: ISector | null, o2: ISector | null): boolean => this.sectorService.compareSector(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contest }) => {
      this.contest = contest;
      if (contest) {
        this.updateForm(contest);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  //*******Modified By Mohamed******

  addContestFieldsLine(): void {
    // Create a new instance of the ContestFields line

    /* this.fields = 
      this.formBuilder.group({
		id: new FormControl(''),  
        cname:new FormControl (this.line.cname),
        ctype: new FormControl(this.line.ctype),
        reference:new FormControl (this.line.reference),
        logic: new FormControl(this.line.logic),
        fopconstraint:new FormControl (this.line.fopconstraint),
        fvalue: new FormControl(this.line.fvalue),
        sopconstraint:new FormControl (this.line.sopconstraint),
        svalue: new FormControl(this.line.svalue),
        mandatory: new FormControl(this.line.mandatory),
        
      })*/

    const newLine: IContestfield = {
      id: '',
      cname: '',
      mandatory: false,
      reference: '',
      ctype: '',
      logic: '',
      fopconstraint: '',
      fvalue: '',
      sopconstraint: '',
      svalue: '',
    };

    // Add the new ContestFields line to the array
    this.contestfieldsLines.push(newLine);
  }

  save(): void {
    this.isSaving = true;

    const contest = this.contestFormService.getContest(this.editForm);
    //const contestfield = this.contestfieldFormService.getContestfield(this.editCfForm);

    if (contest.id !== null) {
      this.subscribeToSaveResponse(this.contestService.update(contest));
    } else {
      /* if (this.contestfieldsLines.length??0){
	for (let i=0;i<this.contestfieldsLines.length;i++){
		const con : IContestfield = { 
	  
	  id: '', 
      cname: '',
      mandatory: false,
      reference: '',
      ctype: '',
      logic: '',
      fopconstraint: '',
      fvalue: '',
      sopconstraint: '',
      svalue: '',
      
      
    };
		  con.cname=(this.contestfieldsLines[i].cname);
		  con.ctype=(this.contestfieldsLines[i].ctype);
	       con.reference=(this.contestfieldsLines[i].reference);
	        con.mandatory=(this.contestfieldsLines[i].mandatory);
	         con.fopconstraint=(this.contestfieldsLines[i].fopconstraint);
	          con.fvalue=(this.contestfieldsLines[i].fvalue);
	           con.sopconstraint=(this.contestfieldsLines[i].sopconstraint);
	            con.svalue=(this.contestfieldsLines[i].svalue);
	            con.logic=(this.contestfieldsLines[i].logic);
	            
	            //con.contest=null,
	            //con.contest=null ;
	          
	            		
	this.contestfieldsLines2.push(con);
		console.log(this.contestfieldsLines);
		
	}
     } */

      contest.contestfields = this.contestfieldsLines;

      this.subscribeToSaveResponse(this.contestService.create(contest));
      //this.contestfieldsLines.push(this.line);
      console.log(this.contestfieldsLines);
      console.log('contest = ', contest);
    }
  }

  handleContestfieldLineDeleted(index: number): void {
    this.contestfieldsLines.splice(index, 1);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContest>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(contest: IContest): void {
    this.contest = contest;
    this.contestFormService.resetForm(this.editForm, contest);

    this.contestannouncesSharedCollection = this.contestannounceService.addContestannounceToCollectionIfMissing<IContestannounce>(
      this.contestannouncesSharedCollection,
      contest.contestannounce
    );
    this.gradesSharedCollection = this.gradeService.addGradeToCollectionIfMissing<IGrade>(this.gradesSharedCollection, contest.grade);
    this.specialitiesSharedCollection = this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(
      this.specialitiesSharedCollection,
      contest.speciality
    );
    this.sectorsSharedCollection = this.sectorService.addSectorToCollectionIfMissing<ISector>(this.sectorsSharedCollection, contest.sector);
  }

  protected loadRelationshipsOptions(): void {
    this.contestannounceService
      .query()
      .pipe(map((res: HttpResponse<IContestannounce[]>) => res.body ?? []))
      .pipe(
        map((contestannounces: IContestannounce[]) =>
          this.contestannounceService.addContestannounceToCollectionIfMissing<IContestannounce>(
            contestannounces,
            this.contest?.contestannounce
          )
        )
      )
      .subscribe((contestannounces: IContestannounce[]) => (this.contestannouncesSharedCollection = contestannounces));

    this.gradeService
      .query()
      .pipe(map((res: HttpResponse<IGrade[]>) => res.body ?? []))
      .pipe(map((grades: IGrade[]) => this.gradeService.addGradeToCollectionIfMissing<IGrade>(grades, this.contest?.grade)))
      .subscribe((grades: IGrade[]) => (this.gradesSharedCollection = grades));

    this.specialityService
      .query()
      .pipe(map((res: HttpResponse<ISpeciality[]>) => res.body ?? []))
      .pipe(
        map((specialities: ISpeciality[]) =>
          this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(specialities, this.contest?.speciality)
        )
      )
      .subscribe((specialities: ISpeciality[]) => (this.specialitiesSharedCollection = specialities));

    this.sectorService
      .query()
      .pipe(map((res: HttpResponse<ISector[]>) => res.body ?? []))
      .pipe(map((sectors: ISector[]) => this.sectorService.addSectorToCollectionIfMissing<ISector>(sectors, this.contest?.sector)))
      .subscribe((sectors: ISector[]) => (this.sectorsSharedCollection = sectors));
  }
}
