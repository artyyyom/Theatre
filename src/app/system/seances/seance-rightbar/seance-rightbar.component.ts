import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ElementRef } from '@angular/core';
import { Seances } from '../../../shared/models/seances.model';
import { Tickets } from '../../../shared/models/tickets.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-seance-rightbar',
  templateUrl: './seance-rightbar.component.html',
  styleUrls: ['./seance-rightbar.component.css']
})
export class SeanceRightbarComponent implements OnInit {
  @Input() category_places;
  @Input() seances;
  @Input() seance_id;
  @Input() performance;
  @Input() ticketsOrder: Array<any> = [];
  @Output() placeOrder = new EventEmitter();
  @Output() _changeSeance = new EventEmitter();
  timeLeft: any; 
  idActivePlace: Array<number>
  ticket: Tickets;
  constructor(private render: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    this.timeLeft = new Date(new Date().getTime() + 15*60000);
  }
  changeSeance(id: number) {
    if(this.seance_id !== id) {
      this.seance_id = id;
      let elements: Array<any> = [];
      elements = this.elRef.nativeElement.querySelectorAll('.ticket');
      console.log(elements);
      elements.forEach((el: any) => {
          this.render.removeClass(el, 'ticket');
          this.placeOrder.emit(el.id);
      });
      this._changeSeance.emit(id);
    }
  }
  closeTicket(id: number) {
    console.log(id);
    this.placeOrder.emit(id);
  }
    
}
