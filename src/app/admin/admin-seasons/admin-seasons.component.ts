import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Seasons } from '../../shared/models/seasons.model';
import { SeasonsService } from '../../shared/services/seasons.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-seasons',
  templateUrl: './admin-seasons.component.html',
  styleUrls: ['./admin-seasons.component.css']
})
export class AdminSeasonsComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  seasons: Seasons[];
  isLoaded: boolean = false;
  isSuccess: boolean = false;
  isError:boolean = false;
  constructor(private seasonsService: SeasonsService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.seasonsService.getSeasons() 
      .subscribe(data => {
        this.seasons = data;
        this.isLoaded = true;
      });
  }
  deleteSeason(id) {
    this.isLoaded = false;
    this.sub2 = this.seasonsService.deleteSeason(id)
      .subscribe(data => {
        this.seasons = this.sharedService.delElArray(this.seasons, id);
        this.isSuccess = true;
        this.isLoaded = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        this.isLoaded = true;
        setTimeout(() => this.isError = false, 4000);
      })
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
  }

}
