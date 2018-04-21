import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Positions } from '../../../../shared/models/positions.model';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.css']
})
export class SubNavigationComponent implements OnInit {
  @Input() navigation: Positions;
  @Output() onChangedId = new EventEmitter<number>();

  click(id: number) {
    this.onChangedId.emit(id);
  }
  constructor() { }
  
  ngOnInit() {
  }

}
