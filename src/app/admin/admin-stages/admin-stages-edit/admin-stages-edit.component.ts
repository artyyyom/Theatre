import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Stages } from '../../../shared/models/stages.model';
import { StagesService } from '../../../shared/services/stages.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-stages-edit',
  templateUrl: './admin-stages-edit.component.html',
  styleUrls: ['./admin-stages-edit.component.css']
})
export class AdminStagesEditComponent implements OnInit, OnDestroy {

  routeId: number;
  sub2: Subscription;
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  stage: Stages;
  isLoad: boolean = false;
  isError: boolean = false;
  constructor(private stagesService: StagesService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
    });
    this.sub2 = this.stagesService.getStage(this.routeId)
      .subscribe((data: Stages) => {
        this.stage = data;
        this.isLoad = true;
      });
  }

  OnSubmit(value) {
    let data = {name: value.name};
    this.sub1 = this.stagesService.updateStage(this.routeId, data)
      .subscribe(data => {
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000);
      });
  }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
  }

}
