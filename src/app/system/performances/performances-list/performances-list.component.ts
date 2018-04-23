import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
   
  }

}
