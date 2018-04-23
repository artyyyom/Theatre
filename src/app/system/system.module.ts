import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HistoryComponent } from './history/history.component';
import { PerformanceComponent } from './performance/performance.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { PerformancesComponent } from './performances/performances.component';
import { HomeComponent } from './home/home.component';
import {EmployeesService} from '../shared/services/employees.service';
import { PositionsService } from '../shared/services/positions.service';
import { SubNavigationComponent } from './shared/components/sub-navigation/sub-navigation.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { FilterItemsPipe } from './shared/pipes/filter-items.pipe';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PerformancesService } from '../shared/services/performances.service';
import { SeancesService } from '../shared/services/seances.service';
import { PerformancesListComponent } from './performances/performances-list/performances-list.component';

@NgModule({
  declarations: [
    SystemComponent,
    FooterComponent,
    NavigationComponent,
    HistoryComponent,
    PerformanceComponent,
    ContactsComponent,
    EmployeeComponent,
    EmployeesComponent,
    PerformancesComponent,
    HomeComponent,
    SubNavigationComponent,
    EmployeesListComponent,
    FilterItemsPipe,
    PerformancesListComponent
  ],
  imports: [CommonModule, SystemRoutingModule, NgSelectModule, FormsModule],
  providers: [EmployeesService, PositionsService, PerformancesService, SeancesService]
})

export class SystemModule {}
