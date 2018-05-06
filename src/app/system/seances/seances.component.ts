import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Seances } from '../../shared/models/seances.model';
import { PerformancesService } from '../../shared/services/performances.service';
import { Performances } from '../../shared/models/performances.model';
import { Stages } from '../../shared/models/stages.model';
import { Rows_PlacesService } from '../../shared/services/rows_places.service';
import { Rows_Places } from '../../shared/models/rows_places.model';
import { TicketsService } from '../../shared/services/tickets.service';
import { Tickets } from '../../shared/models/tickets.model';
import { Category_PlacesService } from '../../shared/services/category_places.service';
import { Category_Places } from '../../shared/models/category_places.model';
import { ComponentCanDeactivate } from '../../shared/guards/exit/exit.guard';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { Observer } from 'rxjs/Observer';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  items: MenuItem[];
  isModalShown: boolean = false;
  disActiveClassId: number = 0;
  isLoad: boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  performance_id: number;
  seance_id: number;
  stage_id: number;
  seances: Seances[];
  stage: Stages;
  tickets: Tickets[];
  performance: Performances;
  rows_places: Rows_Places[];
  ticketsOrder: Tickets[] = [];
  category_places: Category_Places[];
  isLoadPlace: boolean = true;
  isClose: boolean;
  timeLeft: any;
  activeIndex: number = 0;
  ticket = {
    is_avalaible: null
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private performancesService: PerformancesService,
    private rowsplacesService: Rows_PlacesService,
    private ticketsService: TicketsService,
    private categoryplacesService: Category_PlacesService,
    private confirmationService: ConfirmationService
    ) {

   }

  ngOnInit() {
    
    this.getSeances();
  }
  getSeances() {
    this.items = [
      {label: 'Выбор мест',
      command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {label: 'Оформление заказа',
      command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {label: 'Оплата заказа',
      command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
    this.isLoad=false;
    this.activatedRoute.queryParams.subscribe(params => {
      this.performance_id = params.performance_id;
      this.seance_id = params.seance_id;
      this.stage_id = params.stage_id;
    });
    this.sub1 = Observable.combineLatest(
      this.performancesService.getPerformance(this.performance_id, 
                                              'seances', 
                                              this.seance_id),
      this.rowsplacesService.getRowsPlaces(this.stage_id),
      this.ticketsService.getTickets('seances', this.seance_id),
      this.categoryplacesService.getCategoryPlaces(),
    ).subscribe((data: [Performances, Rows_Places[], Tickets[], Category_Places[]]) => {
        this.performance = data[0];
        this.rows_places = data[1];
        this.tickets = data[2];
        this.category_places = data[3];
        this.seances = this.performance.seances;
        this.timerStart();
        this.isLoad = true; 
    });
  }
  placeOrder(order: Tickets) {
    this.isLoadPlace = false;
    if(!order.is_avalaible) {
      if(this.ticketsOrder.length < 5)
        this.ticketsOrder.push(order);
        this.ticketsOrder = this.ticketsOrder.slice();
    } else {
      this.ticketsOrder = this.ticketsOrder.filter(ticketOrder => {
        return ticketOrder.id != order.id;
      });
    }

    this.ticket.is_avalaible = order.is_avalaible;
    // send data to server
    this.sub4 = this.ticketsService.updateTickets(order.id,  this.ticket)
    .subscribe(data => {
      this.isLoadPlace = true;
    })
  }
  changeSeance(id:number) {
    this.sub3 = this.ticketsService.getTickets('seances', id)
      .subscribe((data: Tickets[]) => {
        this.tickets = data;
      });
  }
  closeTicket(order: Tickets) {
    this.isLoadPlace = false;
    this.ticketsOrder = this.ticketsOrder.filter(ticketOrder => {
      return ticketOrder.id != order.id;
    });
    this.disActiveClassId = order.id;
    this.ticket.is_avalaible = order.is_avalaible;
    // send data to server
    this.sub5 = this.ticketsService.updateTickets(order.id, this.ticket)
    .subscribe(data => {
      this.isLoadPlace = true;
    })
  }
  
  @HostListener('window:beforeunload')
  canDeactivate() : boolean | Observable<boolean>{
     
    if(this.ticketsOrder.length) { 
      console.log(this.ticketsOrder);
      this.ticket.is_avalaible = 1;
      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
            key: 'closeConfirmation',
            header: 'Вы уверены что хотите закрыть страницу?',
            message: 'Вы имеете выбранные места. После закрытия страницы все выбранные места будут сброшены!',
            accept: () => {     
                this.ticketsOrder.forEach(ticketOrder => {
                  this.sub5 = this.ticketsService.updateTickets(ticketOrder.id, this.ticket)
                  .subscribe(data => {
                    console.log("hello");
                    observer.next(true);
                    observer.complete();
                  });
                });
                
            },
            reject: () => {
                observer.next(false);
                observer.complete();
            }
        });
    });
    }
    else{
        return true;
    }
  }
  timerStart() {
    this.timeLeft = new Date(new Date().getTime() + 15*60000);
  }
  timerFinish() {
    this.confirmationService.confirm({
      key: 'updatePageDialog',
      header: 'Время выбора мест истекло',
      message: 'Все выбранные места получили статус свободные.', 
      acceptLabel: 'Обновить',
      rejectVisible: false,
      accept: () => {
        this.getSeances()
      }
  });
  }
  ngOnDestroy(): void {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
    if(this.sub3)
      this.sub3.unsubscribe()
    if(this.sub4)
      this.sub4.unsubscribe()
    if(this.sub5)
      this.sub5.unsubscribe()
  }
}
