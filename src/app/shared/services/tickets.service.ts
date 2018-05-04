import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Tickets } from '../models/tickets.model';

@Injectable()
export class TicketsService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getTickets(filter: string = '', seance_id?: number): Observable<Tickets[]> {
        let data = {filter: filter, seance_id: seance_id};
      return this.get('tickets', {params: data})
    }

  updateTickets(id: number, data: any) {
      return this.put(`tickets/${id}`, data);
  }

}
