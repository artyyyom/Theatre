import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tickets } from '../../../shared/models/tickets.model';
import { SeancesService } from '../../../shared/services/seances.service';
import { Seances } from '../../../shared/models/seances.model';
import { Observable } from 'rxjs/Observable';
import { Category_PlacesService } from '../../../shared/services/category_places.service';
import { Category_Places } from '../../../shared/models/category_places.model';

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit, OnDestroy {
  actualSeances: Seances[];
  actualSeancesChunk: Seances[] = [];
  historySeances: Seances[];
  historySeancesChunk: Seances[] = [];
  ticketsOrder = [];
  performance;
  seances = [];
  category_places: Category_Places[];
  isLoading = false;
  sub1: Subscription;
  constructor(private categoryPlacesService: Category_PlacesService,
              private seancesService: SeancesService, 
              private router: Router) { }

  ngOnInit() {
    
    this.sub1 = Observable.combineLatest(
      this.seancesService.getUserActualSeances(),
      this.categoryPlacesService.getCategoryPlaces(),
      this.seancesService.getUserHistorySeances()
    ).subscribe((data:[Seances[], Category_Places[], Seances[]]) => {
        this.actualSeances = data[0];
        this.category_places = data[1];
        this.historySeances = data[2];
        this.isLoading = true;
        let event = {"first": 0, "rows": 1};
        this.paginateActual(event);
        this.paginateHistory(event);
        console.log(data);
      });
  }
  paginateActual(event) {
    this.actualSeancesChunk = this.actualSeances.slice(event.first, event.first+event.rows);
  }
  paginateHistory(event) {
    this.historySeancesChunk = this.historySeances.slice(event.first, event.first+event.rows);
  }
  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
  }

}
