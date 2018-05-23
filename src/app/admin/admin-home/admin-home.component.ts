import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketsService } from '../../shared/services/tickets.service';
import { SeancesService } from '../../shared/services/seances.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  rowData = [];
  data: any;
  constructor(private seancesService: SeancesService) { 

  }

  ngOnInit() {
   let data = {date: 2018};
   this.sub1 = this.seancesService.getReportSalesYear(data)
        .subscribe(data => {
           for(var d in data) {
               if(data[d].buy != undefined)
                this.rowData.push(data[d].buy);
           }
           this.data = {
            labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                     'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            datasets: [
                {
                    label: 'Количество посетителей',
                    data: this.rowData,
                    fill: false,
                    borderColor: '#4bc0c0'
                },
            ]
        }
        });
    }

 ngOnDestroy() {
    if(this.sub1)
        this.sub1.unsubscribe();
 }

}
