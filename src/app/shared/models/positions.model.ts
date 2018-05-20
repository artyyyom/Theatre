export class Positions {
    constructor(
      public id: number,
      public name: string,
      public order: number,
      public is_parent: boolean,  
      public pivot: Object,
      public employees: Object,
    ) {}
  
  }
  