import { Component, OnInit, AfterViewInit } from '@angular/core';
import {stageMainMap} from '../../../models/stages-map.model';
declare var svgPanZoom:any;

@Component({
  selector: 'app-stage-main',
  templateUrl: './stage-main.component.html',
  styleUrls: ['./stage-main.component.css']
})
export class StageMainComponent implements OnInit, AfterViewInit {

  stageMap = stageMainMap;
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
