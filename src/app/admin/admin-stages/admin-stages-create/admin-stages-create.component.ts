import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StagesService } from '../../../shared/services/stages.service';

@Component({
  selector: 'app-admin-stages-create',
  templateUrl: './admin-stages-create.component.html',
  styleUrls: ['./admin-stages-create.component.css']
})
export class AdminStagesCreateComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  constructor(private stagesService: StagesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
    });
  }

  OnSubmit(value) {
    let data = {name: value.name};
    this.sub1 = this.stagesService.addStage(data)
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
  }

}
