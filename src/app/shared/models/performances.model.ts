import { Employees_Performances } from "./Employees_Performances.model";
import { Seances } from "./seances.model";

export class Performances {
    constructor(
      public id: number,
      public name: string,
      public genre: string,
      public duration: string,
      public description: string,
      public photo_main: string,
      public photos: string,
      public pivot: Employees_Performances,
      public seances: Seances[]
    ) {}
  
  }
  