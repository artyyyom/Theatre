import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitsService } from '../../../shared/services/units.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Units } from '../../../shared/models/units.model';

@Component({
  selector: 'app-admin-units-edit',
  templateUrl: './admin-units-edit.component.html',
  styleUrls: ['./admin-units-edit.component.css']
})
export class AdminUnitsEditComponent implements OnInit {
  routeId: number;
  sub2: Subscription;
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  unit: Units;
  isLoad: boolean = false;
  isError: boolean = false;
  constructor(private unitService: UnitsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = this.unitService.getUnit(this.routeId)
      .subscribe((data: Units) => {
        this.unit = data;
        this.isLoad = true;
        this.dataform = this.fb.group({
          'name': new FormControl(this.unit.name, Validators.required),
          'order': new FormControl(this.unit.order, Validators.required),
        });    
      });
  }

  OnSubmit(value) {
    let data = {name: value.name, order: value.order};
    this.sub1 = this.unitService.updateUnit(this.routeId, data)
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
