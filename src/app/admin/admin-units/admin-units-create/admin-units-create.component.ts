import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitsService } from '../../../shared/services/units.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-units-create',
  templateUrl: './admin-units-create.component.html',
  styleUrls: ['./admin-units-create.component.css']
})
export class AdminUnitsCreateComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  constructor(private unitService: UnitsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'order': new FormControl('', Validators.required),
    });
  }

  OnSubmit(value) {
    let data = {name: value.name, order: value.order};
    this.sub1 = this.unitService.addUnit(data)
      .subscribe(data => {
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
      });
  }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
  }

}
