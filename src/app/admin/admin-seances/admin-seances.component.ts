import { Component, OnInit, OnDestroy } from '@angular/core';
import { Seances } from '../../shared/models/seances.model';
import { Subscription } from 'rxjs/Subscription';
import { SeancesService } from '../../shared/services/seances.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-seances',
  templateUrl: './admin-seances.component.html',
  styleUrls: ['./admin-seances.component.css']
})
export class AdminSeancesComponent implements OnInit, OnDestroy {

  isSuccess: boolean = false;
  isError:boolean = false;
  seances: Seances[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  constructor(private seancesService: SeancesService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.seancesService.getSeances()
      .subscribe(data => {
        this.seances = data;
        this.isLoad = true;
      });
  }
  deleteSeance(id) {
    this.isLoad = false;
    this.sub2 = this.seancesService.deleteSeance(id)
      .subscribe(data => {
        this.seances = this.sharedService.delElArray(this.seances, id);
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
