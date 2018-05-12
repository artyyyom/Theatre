import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { UsersService } from '../../shared/services/users.service';
import { Users } from '../../shared/models/users.model';
import { SeancesService } from '../../shared/services/seances.service';

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
  sub6: Subscription;
  sub7: Subscription;
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
  isAvalaiblePlace: boolean;
  displayReserveDialog: boolean = false;
  displayPayDialog: boolean = false;
  errorEmail: boolean = false;
  authCountTickets: number = 0;
  ticket = {
    is_avalaible: null
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private performancesService: PerformancesService,
    private rowsplacesService: Rows_PlacesService,
    private ticketsService: TicketsService,
    private categoryplacesService: Category_PlacesService,
    private confirmationService: ConfirmationService,
    public usersService: UsersService,
    public seancesService: SeancesService,
    ) {

   }

  ngOnInit() {
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
    this.getSeances();
  }
  avalaiblePlace() {
    this.isAvalaiblePlace = this.tickets.some(ticket => {
      return ticket.is_avalaible===1;
    });
  }
  getSeances() {
    
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
        this.avalaiblePlace();
        if(this.usersService.loggedIn()) 
          this.getActiveUserTickets();
        this.isLoad = true; 
    });

  }
  placeOrder(order: Tickets) {
    this.isLoadPlace = false;
    this.ticket.is_avalaible = order.is_avalaible;
    // send data to server
    this.disActiveClassId = 0;
    this.sub4 = this.ticketsService.updateTickets(order.id,  this.ticket)
    .subscribe(data => {
      console.log(data);
      if(data.status==="404") {
        this.disActiveClassId = order.id;
        this.confirmationService.confirm({
          key: 'updatePageDialog',
          header: 'Упс, а место уже заняли(',
          message: 'Но ничего, есть шанс выбрать другие!', 
          acceptLabel: 'Продолжить выбор мест',
          rejectVisible: false,
        });
      }
      else if(!order.is_avalaible) {
        console.log(this.authCountTickets);
        if(this.ticketsOrder.length < (3-this.authCountTickets))
          this.ticketsOrder.push(order);
          this.ticketsOrder = this.ticketsOrder.slice();
      } else {
        this.ticketsOrder = this.ticketsOrder.filter(ticketOrder => {
          return ticketOrder.id != order.id;
        });
      }
      this.isLoadPlace = true;
    });
    
    

    
  }
  changeSeance(id:number) {
    this.sub3 = this.ticketsService.getTickets('seances', id)
      .subscribe((data: Tickets[]) => {
        this.tickets = data;
        this.avalaiblePlace();
        if(this.usersService.loggedIn()) 
          this.getActiveUserTickets();
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
      this.ticket.is_avalaible = 1;
      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            key: 'closeConfirmation',
            header: 'Вы уверены что хотите закрыть страницу?',
            message: 'Вы имеете выбранные места. После закрытия страницы все выбранные места будут сброшены!',
            accept: () => {     
                this.ticketsOrder.forEach(ticketOrder => {
                  this.sub5 = this.ticketsService.updateTickets(ticketOrder.id, this.ticket)
                  .subscribe(data => {
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
        this.activeIndex = 0;
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
      this.sub3.unsubscribe();
    if(this.sub4)
      this.sub4.unsubscribe();
    if(this.sub5)
      this.sub5.unsubscribe();
    if(this.sub6)
      this.sub6.unsubscribe();
    if(this.sub7)
      this.sub7.unsubscribe();
  }
  orderTickets() {
    this.activeIndex = 1;
    this.timerStart();
  }
  reserveTicket(value: any) {
    if(!this.usersService.loggedIn())
      this.createUser(value);
    else
      this.updateTicketsAuth(value);
  }
  
  buyTicket(value: any) {
    this.activeIndex = 2;
    if(!this.usersService.loggedIn())
      this.createUser(value);
    else {
      this.updateTicketsAuth(value); 
      console.log('istme');
    }
  }
  createUser(value: any) {
    this.errorEmail = false;
    let ticket = {user_id: null, status: null};
    let user = new Users(null, value.name, value.email, value.phone);
    this.sub6 = this.usersService.createUser(user)
      .subscribe(data => {
        if(data.email) {
          this.errorEmail = true;
          console.log('tut');
        } 
        else {
          this.ticketsOrder.forEach(ticketOrder => {
            ticket.status = value.checkboxReserve ? 1 : -1;
            ticket.user_id = data;
            this.ticketsService.updateTickets(ticketOrder.id, ticket)
              .subscribe(data => {
                if(ticket.status === 1)
                  this.displayReserveDialog = true;
              });   
          }); 
          if(ticket.status === 1)
            this.ticketsOrder = [];       
        }
      });
  }
  reserveRedirect() {
    this.router.navigate(['/performances']);
  }
  getActiveUserTickets() {
    this.seancesService.getUserActualSeances()
      .subscribe(data => {
        data.forEach(e => {
          console.log(e);
          if(e.id==this.seance_id) {
            this.authCountTickets = e.tickets.length;
          }
        });
      });
  }
  updateTicketsAuth(value) {
    this.displayReserveDialog = false;
    let ticket = {status: null};
    this.ticketsOrder.forEach(ticketOrder => {
      ticket.status = value.checkboxReserve ? 1 : -1;
      this.ticketsService.updateTicketsAuth(ticketOrder.id, ticket)
        .subscribe(data => {
          if(ticket.status === 1) {
            this.displayReserveDialog = true;
            this.ticketsOrder = [];
          }
        });   
    }); 
  }

  updateTicketPayStatus() {
    this.displayPayDialog = false;
    let ticket = {status: null};
    this.ticketsOrder.forEach(ticketOrder => {
      ticket.status = 2;
      this.ticketsService.updateTickets(ticketOrder.id, ticket)
        .subscribe(data => {
          this.displayPayDialog = true;
        });   
    });
    this.ticketsOrder = [];
  }
}