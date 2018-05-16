import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Seasons } from '../../../shared/models/seasons.model';
import { SeasonsService } from '../../../shared/services/seasons.service';
import { ActivatedRoute } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-seasons-edit',
  templateUrl: './admin-seasons-edit.component.html',
  styleUrls: ['./admin-seasons-edit.component.css']
})
export class AdminSeasonsEditComponent implements OnInit {

  routeId: number;
  sub2: Subscription;
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  season: Seasons;
  isLoad: boolean = false;
  isError: boolean = false;
  constructor(private seasonsService: SeasonsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = this.seasonsService.getSeason(this.routeId)
      .subscribe((data: Seasons) => {
        this.season = data;
        this.isLoad = true;
        this.dataform = this.fb.group({
          'name': new FormControl(this.season.name, Validators.required),
          'start_date': new FormControl(this.season.start_date, Validators.required),
          'end_date': new FormControl(this.season.end_date, Validators.required)
        });
        
      });
  }

  OnSubmit(value) {

    let data = {name: value.name, 
      start_date: value.start_date, 
      end_date: value.end_date};
    this.sub1 = this.seasonsService.updateSeason(this.routeId, data)
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
