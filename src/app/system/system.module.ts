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
    FilterItemsPipe
  ],
  imports: [CommonModule, SystemRoutingModule],
  providers: [EmployeesService, PositionsService]
})

export class SystemModule {}
