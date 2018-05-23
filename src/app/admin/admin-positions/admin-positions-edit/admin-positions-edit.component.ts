import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Positions } from '../../../shared/models/positions.model';
import { PositionsService } from '../../../shared/services/positions.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-positions-edit',
  templateUrl: './admin-positions-edit.component.html',
  styleUrls: ['./admin-positions-edit.component.css']
})
export class AdminPositionsEditComponent implements OnInit, OnDestroy {

  routeId: number;
  sub2: Subscription;
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  position: Positions;
  isLoad: boolean = false;
  isError: boolean = false;
  constructor(private positionsService: PositionsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = this.positionsService.getPosition(this.routeId)
      .subscribe((data: Positions) => {
        this.position = data;
        this.isLoad = true;
        this.dataform = this.fb.group({
          'name': new FormControl(this.position.name, Validators.required),
          'order': new FormControl(this.position.order, Validators.required),
        });    
      });
  }

  OnSubmit(value) {
    let data = {name: value.name, order: value.order};
    this.sub1 = this.positionsService.updatePosition(this.routeId, data)
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
