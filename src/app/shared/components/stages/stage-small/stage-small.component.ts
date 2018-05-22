import { Component, OnInit, AfterViewInit, Input, Renderer2, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
declare var svgPanZoom:any;
import {stageSecondMap} from '../../../models/stages-map.model';
import { Tickets } from '../../../models/tickets.model';
@Component({
  selector: 'app-stage-small',
  templateUrl: './stage-small.component.html',
  styleUrls: ['./stage-small.component.css']
})
export class StageSmallComponent implements OnInit, AfterViewInit {
  active: boolean = false;
  ticketsMap: Array<any> = [];
  stageMap;
  tickets;
  isLoadPlace: boolean;
  @Input('isLoadPlace') set _isLoadPlace(value) {
    this.isLoadPlace = value;
  }
  @Input('stageMap') set _stageMap(value) {
    this.stageMap = value;
  }
  @Input() authCountTickets;
  @Input('tickets') set _megreMapTickets(value) {
      this.tickets = value;
      if(this.stageMap  && this.tickets) {
        this.ticketsMap.length = 0;
        this.countTickets = 0;
        this.stageMap.forEach(map => {
          this.tickets.forEach(ticket => {
            if(map.place_id==ticket.place_id && 
                map.row_id==ticket.row_id && 
                map.category_id==ticket.category_id) {
                  this.ticketsMap.push({map: map, ticket: ticket});
            } 
          });
        });
        console.log(this.stageMap);
        console.log(this.tickets);
      }
  }
  @Output() placeOrder = new EventEmitter();
  @Input('disActiveClass') set _disActiveClass(id) {
    if(id) {
      let elements: Array<any> = [];
      elements = this.elRef.nativeElement.querySelectorAll('.svg__circle_active');
      elements.forEach((el: any) => {
        if(el.textContent==id) {
          this.render.removeClass(el, 'svg__circle_active');
          this.countTickets--;
        }
      });
    }
  }
  ticket: Tickets;
  countTickets: number = 0;
  //stageMap = stageSecondMap;
  options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
  }
  constructor(private elRef: ElementRef, private render: Renderer2) { }
 
  ngOnInit() {
  }
  ngAfterViewInit() {
    let svg =  svgPanZoom('#stage-main-map', this.options);
  }

  clickPlace(event: any, id, place_id, row_id, category_id, seance_id, price, is_avalaible) {
    if(is_avalaible) {
      if(event.target.className.animVal !== 'svg__circle svg__circle_active')  {
        if(this.countTickets < (3-this.authCountTickets)) {
          this.render.addClass(event.target, 'svg__circle_active');
          this.ticket = new Tickets(id, row_id, place_id, category_id, seance_id, price, 0, null);
          this.placeOrder.emit(this.ticket);
          this.countTickets++;
        }
      }
      else { 
        this.render.removeClass(event.target, 'svg__circle_active');
        this.ticket = new Tickets(id, row_id, place_id, category_id, seance_id, price, 1, null);
        this.placeOrder.emit(this.ticket);
        this.countTickets--;
      }
    }

    
    

  }

    
}
