import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Category_Places } from '../../shared/models/category_places.model';
import { SharedService } from '../../shared/shared.service';
import { Category_PlacesService } from '../../shared/services/category_places.service';

@Component({
  selector: 'app-admin-category-places',
  templateUrl: './admin-category-places.component.html',
  styleUrls: ['./admin-category-places.component.css']
})
export class AdminCategoryPlacesComponent implements OnInit {

  isSuccess: boolean = false;
  isError:boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  category_places: Category_Places[];
  constructor(private categoryService: Category_PlacesService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.categoryService.getCategoryPlaces()
      .subscribe(data => {
        this.category_places = data;
        this.isLoad = true;
      });
  }
  deleteCategoryPlace(id) {
    this.isLoad = false;
    this.sub2 = this.categoryService.deleteCategoryPlace(id)
      .subscribe(data => {
        this.category_places = this.sharedService.delElArray(this.category_places, id);
        this.isSuccess = true;
        this.isLoad = true;
        setTimeout(() => this.isSuccess = false, 4000);
      },error =>{
        this.isError = true;
        this.isLoad = true;
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
