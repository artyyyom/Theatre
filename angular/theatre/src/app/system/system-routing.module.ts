import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SystemComponent} from './system.component';
import {HistoryComponent} from './history/history.component';
import {PerformancesComponent} from './performances/performances.component';
import {EmployeesComponent} from './employees/employees.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HomeComponent} from './home/home.component';

const routes = [{path: '', component: SystemComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'performances', component: PerformancesComponent},
    {path: 'employees', component: EmployeesComponent},
    {path: 'contacts', component: ContactsComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {

}
