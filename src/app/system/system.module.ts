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
import { StagesService } from '../shared/services/stages.service';
import { SeasonsService } from '../shared/services/seasons.service';
import { FilterItems2Pipe } from './shared/pipes/filter-items-2.pipe';
import { FilterPerformancesPipe } from './shared/pipes/filterPerformances/filter-performances.pipe';
import { FilterPerformancesSeasonsPipe } from './shared/pipes/filterPerformances/filter-performances-seasons.pipe';
import { FilterPerformancesStagePipe } from './shared/pipes/filterPerformances/filter-performances-stage.pipe';
import { FilterPerformancsesMonthsPipe } from './shared/pipes/filterPerformances/filter-performancses-months.pipe';
import { UnitsService } from '../shared/services/units.service';
import { ResizeGreedDirective } from './shared/directives/resize-greed/resize-greed.directive';
import { SeancesComponent } from './seances/seances.component';
import { SeanceRightbarComponent } from './seances/seance-rightbar/seance-rightbar.component';
import { StageSmallComponent } from '../shared/components/stages/stage-small/stage-small.component';
import { StageMainComponent } from '../shared/components/stages/stage-main/stage-main.component';
import { Rows_PlacesService } from '../shared/services/rows_places.service';
import { TicketsService } from '../shared/services/tickets.service';
import { MergeArrayPipe } from '../shared/pipes/merge-array/merge-array.pipe';
import { Category_PlacesService } from '../shared/services/category_places.service';

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
    PerformancesListComponent,
    FilterItems2Pipe,
    FilterPerformancesPipe,
    FilterPerformancesSeasonsPipe,
    FilterPerformancesStagePipe,
    FilterPerformancsesMonthsPipe,
    ResizeGreedDirective,
    SeancesComponent,
    SeanceRightbarComponent,
    StageMainComponent,
    StageSmallComponent,
    MergeArrayPipe,
  ],
  imports: [
    CommonModule, 
    SystemRoutingModule, 
    NgSelectModule, 
    FormsModule
  ],
  providers: [
    EmployeesService, 
    PositionsService, 
    PerformancesService, 
    SeancesService,
    StagesService,
    SeasonsService,
    UnitsService,
    Rows_PlacesService,
    TicketsService,
    Category_PlacesService

  ]
})

export class SystemModule {}
