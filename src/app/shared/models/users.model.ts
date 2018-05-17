import { Roles } from "./roles.model";

export class Users {
    constructor(
      public id: number,
      public name: string, 
      public email: string,
      public phone: string,
      public roles: Roles[] = null
    ) {}
  
  }
  