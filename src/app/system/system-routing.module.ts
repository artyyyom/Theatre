import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SystemComponent} from './system.component';
import {HistoryComponent} from './history/history.component';
import {PerformancesComponent} from './performances/performances.component';
import {EmployeesComponent} from './employees/employees.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HomeComponent} from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { PerformanceComponent } from './performance/performance.component';
import { StageSmallComponent } from '../shared/components/stages/stage-small/stage-small.component';
import { SeancesComponent } from './seances/seances.component';
import { ExitGuard } from '../shared/guards/exit/exit.guard';
import { LoginComponent } from '../authentication/login/login.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';

const routes = [{path: '', component: SystemComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'performances', component: PerformancesComponent},
    {path: 'performance/:id', component: PerformanceComponent},
    {path: 'employees', component: EmployeesComponent},
    {path: 'employee/:id', component: EmployeeComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'seances', component: SeancesComponent, canDeactivate: [ExitGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'profile-order',
     loadChildren: 'app/system/user/user.module#UserModule',
     
    },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {

}
