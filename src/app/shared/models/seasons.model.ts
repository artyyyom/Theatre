export class Seasons {
    constructor(
      public id: number,
      public name: string,
      public start_date: Date,
      public end_date: Date, 
      public isActive: boolean,
      public is_parent: boolean,

    ) {}
  
  }
  