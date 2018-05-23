import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Positions } from '../../shared/models/positions.model';
import { PositionsService } from '../../shared/services/positions.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-positions',
  templateUrl: './admin-positions.component.html',
  styleUrls: ['./admin-positions.component.css']
})
export class AdminPositionsComponent implements OnInit, OnDestroy {

  isSuccess: boolean = false;
  isError:boolean = false;
  positions: Positions[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  constructor(private positionsService: PositionsService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.positionsService.getPositions()
      .subscribe(data => {
        this.positions = data;
        this.isLoad = true;
      });
  }
  deletePosition(id) {
    this.isLoad = false;
    this.sub2 = this.positionsService.deletePosition(id)
      .subscribe(data => {
        this.positions = this.sharedService.delElArray(this.positions, id);
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
