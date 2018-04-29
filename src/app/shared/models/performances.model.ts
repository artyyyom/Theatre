import { Employees_Performances } from "./Employees_Performances.model";
import { Seances } from "./seances.model";
import { Employees } from "./employees.model";

export class Performances {
    constructor(
      public id: number,
      public name: string,
      public author: string,
      public age_restrict: string,
      public genre: string,
      public duration: string,
      public description: string,
      public photo_main: string,
      public photos: string,
      public pivot: Employees_Performances,
      public seances: Seances[],
      public employees: Employees[]
    ) {}
  
  }
  