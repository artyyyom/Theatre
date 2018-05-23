import { Employees_Performances } from "./Employees_Performances.model";
import { Units } from "./units.model";
import { Positions } from "./positions.model";

export class Employees {
  constructor(
    public id: number,
    public surname: string,
    public name: string,
    public middlename: string,
    public address: string,
    public birthday: Date,
    public biography: string,
    public mobile_number: string,
    public biography_short: string,
    public photo_main: string,
    public photos: string,
    public position_id: number,
    public performances: Array<any>,
    public role: string,
    public pivot: any,
    public unit: Units,
    public positions: Positions[]
  ) {}

}
