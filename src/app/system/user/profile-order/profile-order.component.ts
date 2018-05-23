import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Tickets } from '../../../shared/models/tickets.model';
import { SeancesService } from '../../../shared/services/seances.service';
import { Seances } from '../../../shared/models/seances.model';
import { Observable } from 'rxjs/Observable';
import { Category_PlacesService } from '../../../shared/services/category_places.service';
import { Category_Places } from '../../../shared/models/category_places.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { TicketsService } from '../../../shared/services/tickets.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit, OnDestroy {
  cardform: FormGroup;
  actualSeances: Seances[];
  actualSeancesChunk: Seances[] = [];
  historySeances: Seances[];
  historySeancesChunk: Seances[] = [];
  ticketsOrder = [];
  category_places: Category_Places[];
  isLoading = false;
  display: boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  ticket_id: number = 0;
  displayAnswer: boolean = false;
  constructor(private categoryPlacesService: Category_PlacesService,
              private seancesService: SeancesService, 
              private router: Router,
              private fb: FormBuilder,
              private ticketsService: TicketsService,
              ) { 

                
              }

  ngOnInit() {
    this.cardform = this.fb.group({
      'cc-number': new FormControl('', Validators.required),
      'cc-exp-date': new FormControl('', Validators.required),
      'cc-cvc': new FormControl('', Validators.required),
    });
    this.sub1 = Observable.combineLatest(
      this.seancesService.getUserActualSeances(),
      this.seancesService.getUserHistorySeances()
    ).subscribe((data:[Seances[], Seances[]]) => {
        this.actualSeances = data[0];
        this.historySeances = data[1];
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
    if(this.sub2) 
      this.sub2.unsubscribe();
  }
  clickReturn(ticket_id) {
    this.display = true;
    this.ticket_id = ticket_id;
    console.log(this.ticket_id);

  }
  updateTicketStatus() {
    let ticket = {status: 0, is_avalaible: 1, user_id: 0};
    this.sub2 = this.ticketsService.updateTicketsAuth(this.ticket_id, ticket)
      .subscribe(data => {
        this.display = false;
        this.displayAnswer = true;
        this.removeTicket();
      });
  }
  removeTicket() {
    this.actualSeances.forEach((actualSeance, index) => {
      this.actualSeances[index].tickets = actualSeance.tickets.filter(ticket => {
        return ticket.id !== this.ticket_id;
      })
    });
  }
  pdfGenerator(seance: Seances, ticket: Tickets) {
    let pipe = new DatePipe('ru'); // Use your own locale
    let datetime = new Date(seance.datetime);
    let formattedDate = pipe.transform(datetime, 'dd MMMM yy');
    let formattedTime = pipe.transform(datetime, 'HH:ss')
    let code = Math.random();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = { 
      content: [ 
        {text: 'Рады приветствовать вас в мариупольском драматическом театре. Спасибо за покупку!', margin: [20, 20, 20, 20]}, 
          { 
            style: 'tableExample', 
            table: { 
            widths: [70, 300, 150], 
            body: [ 
              [{ 
              height: 150, 
              alignment: 'center', 
              text: 'Билет в Драматический театр г.Мариуполя', 
              bold: true, 
              fontSize: 15, 
              colSpan: 3, 
              border: [true, true, true, true]}, 
              {}, 
              {}], 
          [{text: `№${code}`},
           {alignment: 'center', fontSize: 17, colSpan: 2, text: `${seance.performance.name}  (${seance.performance.age_restrict}+)`,bold: true,  border: [true, true, true, false]}, 
           {}
          ], 
          [{text: `Длительность: ${seance.performance.duration}`,bold: true, colSpan: 3, border: [true, false, true, false]}], 
          [{text: `Автор: ${seance.performance.author}`,bold: true, colSpan: 3, border: [true, false, true, true]}], 
          [{text: `Название сцены: ${seance.stage.name}`,bold: true, colSpan:2, border: [true, false, false, false]}, 
            {}, 
            {text: `Дата: ${formattedDate} `, border: [true, true, true, false]
          }], 
          [{text: `Категория: ${ticket.category_place.name}`, colSpan:2, bold: true, border: [true, false, false, false]}, 
          {}, 
          {text: `Время: ${formattedTime}`, border: [true, false, true, false]}], 
          [{text: `Ряд: ${ticket.row_id}`, colSpan:2, bold: true, border: [true, false, false, false]},
          {},
          {text: `Цена: ${ticket.price/1000} грн.`, border: [true, false, true, false]}], 
          [{text: `Место: ${ticket.place_id}`,bold: true, colSpan:2, border: [true, false, false, true]},
          {},  
          {text: '', border: [true, false, true, true]}], 
          ] 
          }, 
        }, 
     ] 
}
    pdfMake.createPdf(dd).download(`ticket${ticket.id}${seance.datetime}.pdf`);
  }

}
