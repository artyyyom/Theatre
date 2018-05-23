import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { SeancesService } from '../../../shared/services/seances.service';
import { Seances } from '../../../shared/models/seances.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-buyers-view',
  templateUrl: './admin-buyers-view.component.html',
  styleUrls: ['./admin-buyers-view.component.css']
})
export class AdminBuyersViewComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  actualSeances: Seances[] = [];
  historySeances: Seances[] = [];
  isLoading: boolean = false;
  actualSeancesChunk: Seances[] = [];
  historySeancesChunk: Seances[] = [];
  routeId: number;
  constructor(private seancesService: SeancesService,
             private route: ActivatedRoute) {}
  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    let data = {id: this.routeId};
    this.sub1 = Observable.combineLatest(
      this.seancesService.getUserActualSeances(data),
      this.seancesService.getUserHistorySeances(data)
    ).subscribe((data:[Seances[], Seances[]]) => {
        this.actualSeances = data[0];
        this.historySeances = data[1];
        console.log(this.actualSeances);
        this.isLoading = true;
        let event = {"first": 0, "rows": 1};
        this.paginateActual(event);
        this.paginateHistory(event);
        console.log(this.actualSeances);
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
