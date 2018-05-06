import { Component, 
         OnInit, 
         Input, 
         EventEmitter, 
         Output, 
         Renderer2, 
         ElementRef, 
         TemplateRef, 
         OnDestroy} from '@angular/core';
import { Seances } from '../../../shared/models/seances.model';
import { Tickets } from '../../../shared/models/tickets.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-seance-rightbar',
  templateUrl: './seance-rightbar.component.html',
  styleUrls: ['./seance-rightbar.component.css']
})
export class SeanceRightbarComponent implements OnInit{
  @Input() category_places;
  @Input() seances;
  @Input() seance_id;
  @Input() performance;
  @Input() timeLeft;
  message: string;
  ticketsOrder: Array<any> = [];
  @Input('ticketsOrder') set _ticketsOrder(_ticketsOrder) {
    this.ticketsOrder = _ticketsOrder;
    this.pay(this.ticketsOrder);
  }

  @Output() placeOrder = new EventEmitter();
  @Output() _changeSeance = new EventEmitter();
  @Output() _timerFinish = new EventEmitter();
  idActivePlace: Array<number>
  ticket: Tickets;
  sumTickets: number;
  constructor(private render: Renderer2, 
              private elRef: ElementRef,
              ) { }
  pay(ticketsOrder) {
    this.sumTickets = 0;
    ticketsOrder.forEach(ticketOrder => {
      this.sumTickets+=(ticketOrder.price/1000);
    });
  }
  ngOnInit() {
    this.setTime();
  }
  setTime() {
   // this.timeLeft = new Date(new Date().getTime() + 0.2*60000);
  }
  removeTickets() {
    let elements: Array<any> = [];
    elements = this.elRef.nativeElement.querySelectorAll('.ticket');
    elements.forEach((el: any) => {
      this.render.removeClass(el, 'ticket');
      let ticket = new Tickets();
      ticket.id = el.id;
      ticket.is_avalaible = 1;
      this.placeOrder.emit(ticket);
    });
  }
  changeSeance(id: number) {
    if(this.seance_id !== id) {
      this.timeLeft = new Date(new Date().getTime() + 15*60000);
      this.seance_id = id;
      this.removeTickets();
      this._changeSeance.emit(id);
    }
  }
  closeTicket(id: number) {
    
    let ticket = new Tickets();
    ticket.id = id;
    ticket.is_avalaible = 1;
    this.placeOrder.emit(ticket);
  }
  timerFinish() {
    this.removeTickets();
    this._timerFinish.emit(true);
  }
    
}
