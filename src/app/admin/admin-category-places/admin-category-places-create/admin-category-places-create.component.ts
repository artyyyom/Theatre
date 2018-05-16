import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category_PlacesService } from '../../../shared/services/category_places.service';

@Component({
  selector: 'app-admin-category-places-create',
  templateUrl: './admin-category-places-create.component.html',
  styleUrls: ['./admin-category-places-create.component.css']
})
export class AdminCategoryPlacesCreateComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  constructor(private categoryService: Category_PlacesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
    });
  }

  OnSubmit(value) {
    let data = {name: value.name};
    this.sub1 = this.categoryService.addCategoryPlace(data)
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
