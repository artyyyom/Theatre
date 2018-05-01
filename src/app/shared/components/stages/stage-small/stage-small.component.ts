import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var svgPanZoom:any;
import {stageSecondMap} from '../../../models/stages-map.model';
@Component({
  selector: 'app-stage-small',
  templateUrl: './stage-small.component.html',
  styleUrls: ['./stage-small.component.css']
})
export class StageSmallComponent implements OnInit, AfterViewInit {

  stageMap = stageSecondMap;
  options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
  }
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let svg =  svgPanZoom('#stage-main-map', this.options);
  }

}
