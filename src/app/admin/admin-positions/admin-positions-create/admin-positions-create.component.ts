import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PositionsService } from '../../../shared/services/positions.service';

@Component({
  selector: 'app-admin-positions-create',
  templateUrl: './admin-positions-create.component.html',
  styleUrls: ['./admin-positions-create.component.css']
})
export class AdminPositionsCreateComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  constructor(private positionsService: PositionsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'order': new FormControl('', Validators.required),
    });
  }

  OnSubmit(value) {
    let data = {name: value.name, order: value.order};
    this.sub1 = this.positionsService.addPosition(data)
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
