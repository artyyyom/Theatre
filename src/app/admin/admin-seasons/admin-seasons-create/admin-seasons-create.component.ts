import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SeasonsService } from '../../../shared/services/seasons.service';

@Component({
  selector: 'app-admin-seasons-create',
  templateUrl: './admin-seasons-create.component.html',
  styleUrls: ['./admin-seasons-create.component.css']
})
export class AdminSeasonsCreateComponent implements OnInit {

  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  constructor(private seasonsService: SeasonsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'start_date': new FormControl('', Validators.required),
      'end_date': new FormControl('', Validators.required)
    });
  }

  OnSubmit(value) {
    let data = {name: value.name, 
                start_date: value.start_date, 
                end_date: value.end_date};
    this.sub1 = this.seasonsService.addSeason(data)
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
