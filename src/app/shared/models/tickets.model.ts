export class Tickets {
    constructor(
      public id: number,
      public row_id: number, 
      public place_id: number,
      public category_id: number,
      public seance_id: number,
      public price: number,
      public is_avalaible: boolean,
      public status: boolean,
    ) {}
  
  }
  