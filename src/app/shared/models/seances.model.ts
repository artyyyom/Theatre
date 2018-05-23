import { Time } from "@angular/common";
import { Stages } from "./stages.model";
import { Performances } from "./performances.model";
import { Tickets } from "./tickets.model";
import { Seasons } from "./seasons.model";

export class Seances {
    constructor(
      public id: number,
      public date: string,
      public datetime: string,
      public time: Time,
      public performance_id: number, 
      public stage_id: number,
      public stage: Stages,
      public performance: Performances,
      public tickets: Tickets[],
      public season: Seasons,
    ) {}
  
  }
  