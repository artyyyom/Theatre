import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Seances } from '../../../shared/models/seances.model';
import { Performances } from '../../../shared/models/performances.model';

@Component({
  selector: 'app-performances-list',
  templateUrl: './performances-list.component.html',
  styleUrls: ['./performances-list.component.css']
})
export class PerformancesListComponent implements OnInit {
  @Input() seances: Seances[];
  @Input() keys: any;
  @Input() seasonSelectId: number;
  @Input() stageSelectId: number;
  @Input() monthSelectId: number;
  date: any;
  old_date: any = '';
  
  constructor() { }

  ngOnInit() {
    
  }
  newTime(time) {
    console.log(Date.parse(time));
    return Date.parse(time)

  }
}
