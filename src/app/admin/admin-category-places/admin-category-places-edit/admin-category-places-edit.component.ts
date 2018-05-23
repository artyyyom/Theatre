import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category_Places } from '../../../shared/models/category_places.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Category_PlacesService } from '../../../shared/services/category_places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category-places-edit',
  templateUrl: './admin-category-places-edit.component.html',
  styleUrls: ['./admin-category-places-edit.component.css']
})
export class AdminCategoryPlacesEditComponent implements OnInit, OnDestroy {

  routeId: number;
  sub2: Subscription;
  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  stage: Category_Places;
  isLoad: boolean = false;
  isError: boolean = false;
  constructor(private categoryService: Category_PlacesService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
    });
    this.sub2 = this.categoryService.getCategoryPlace(this.routeId)
      .subscribe((data: Category_Places) => {
        this.stage = data;
        this.isLoad = true;
      });
  }

  OnSubmit(value) {
    let data = {name: value.name};
    this.sub1 = this.categoryService.updateCategoryPlace(this.routeId, data)
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
