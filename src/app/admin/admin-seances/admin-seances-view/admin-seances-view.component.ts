import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Rows_Places } from '../../../shared/models/rows_places.model';
import { Tickets } from '../../../shared/models/tickets.model';
import { Rows_PlacesService } from '../../../shared/services/rows_places.service';
import { TicketsService } from '../../../shared/services/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SeancesService } from '../../../shared/services/seances.service';
import { Seances } from '../../../shared/models/seances.model';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/models/users.model';
import {DialogModule} from 'primeng/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-seances-view',
  templateUrl: './admin-seances-view.component.html',
  styleUrls: ['./admin-seances-view.component.css']
})
export class AdminSeancesViewComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  ticketform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  isSuccessTicket: boolean = false;
  isErrorTicket: boolean = false;
  seance: Seances;
  rowplaces: Rows_Places[];
  tickets: Tickets[];
  isLoad: boolean = false;
  routeId: number;
  display: boolean = false;
  user: Users;
  
  constructor(private seancesService: SeancesService,
              private rowplacesService: Rows_PlacesService,
              private ticketsService: TicketsService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = Observable.combineLatest(
      this.ticketsService.getTickets('seances', this.routeId),
      this.seancesService.getSeance(this.routeId)
    )
    .subscribe((data: [Tickets[], Seances]) => {
      this.tickets = data[0];
      this.seance = data[1];
      this.getRowsPlaces();
      this.isLoad = true;
      console.log(this.tickets);

    }, error => {

    })
    
  }
  getRowsPlaces() {
    this.sub3 = this.rowplacesService.getRowsPlaces(this.seance.stage.id)
      .subscribe(data => {
        this.rowplaces = data;
        console.log(this.rowplaces);
      });
  }

  showUser(id) {
    this.sub1 = this.usersService.getUserByTicketId(id)
      .subscribe(data => {
        this.user = data;
        this.display = true;
      })        

  }
  pdfGenerator(seance) {
    this.sub4 = this.ticketsService.getReportSalesSeance(seance)
      .subscribe(data => {
        console.log(data);
          console.log(data.order);
          let pipe = new DatePipe('ru'); // Use your own locale
          let datetime = new Date(seance.datetime);
          let formattedDate = pipe.transform(datetime, 'dd MMMM yyyy');
          let formattedTime = pipe.transform(datetime, 'HH:ss');
          let code = Math.random();
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          var dd = { 
            content: 
            [
              'Драматический театр г. Мариуполя',
              {text: 'Отчет по продаже билетов', style: 'header', alignment: 'center'},
              {text:`Отчет по продаже билетов на ${formattedDate}`,style: 'subheader', alignment: 'center'},
              `Время: ${formattedTime}.`,
              `Cпектакль: ${this.seance.performance.name}.`,
              `Сцена: ${this.seance.stage.name}.`,
              'Текущий статус билетов:',
              {
                style: 'tableExample',
                table: {
                  body: [
                    ['Количество забронированных билетов', `${data.order}`],
                    ['Количество проданных билетов', `${data.buy}`],
                    ['Общая сумма выручки', `${data.sum/1000} грн.`],
                  ]
                }
              },
              'Отчет составил _________________',
              {text: 'Подпись ___________', margin: [0, 10, 0, 5]}
              
            ],
            styles: {
              header: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10]
              },
              subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 5, 0, 10]
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              },
              tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
              }
            }, 
          }
          pdfMake.createPdf(dd).download(`ticket${seance.datetime}.pdf`);
      })
    
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
    if(this.sub3)
      this.sub3.unsubscribe();
    if(this.sub4)
      this.sub4.unsubscribe();
  }

}
