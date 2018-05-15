import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPerformancesComponent } from './admin-performances/admin-performances.component';
import { AdminEmployeesComponent } from './admin-employees/admin-employees.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminLoginComponent } from './admin-authentication/admin-login/admin-login.component';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AdminFooterComponent } from './shared/components/admin-footer/admin-footer.component';
import { AdminNavComponent } from './shared/components/admin-nav/admin-nav.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'primeng/components/common/shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAuthenticationComponent } from './admin-authentication/admin-authentication.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdminSeancesComponent } from './admin-seances/admin-seances.component';
import { AdminStagesComponent } from './admin-stages/admin-stages.component';
import { AdminCategoryPlacesComponent } from './admin-category-places/admin-category-places.component';
import { AdminSeasonsComponent } from './admin-seasons/admin-seasons.component';
import { AdminCategoryPlacesCreateComponent } from './admin-category-places/admin-category-places-create/admin-category-places-create.component';
import { AdminCategoryPlacesEditComponent } from './admin-category-places/admin-category-places-edit/admin-category-places-edit.component';
import { AdminEmployeesEditComponent } from './admin-employees/admin-employees-edit/admin-employees-edit.component';
import { AdminEmployeesCreateComponent } from './admin-employees/admin-employees-create/admin-employees-create.component';
import { AdminPerformancesCreateComponent } from './admin-performances/admin-performances-create/admin-performances-create.component';
import { AdminPerformancesEditComponent } from './admin-performances/admin-performances-edit/admin-performances-edit.component';
import { AdminSeasonsEditComponent } from './admin-seasons/admin-seasons-edit/admin-seasons-edit.component';
import { AdminSeasonsCreateComponent } from './admin-seasons/admin-seasons-create/admin-seasons-create.component';
import { AdminUsersCreateComponent } from './admin-users/admin-users-create/admin-users-create.component';
import { AdminUsersEditComponent } from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminStagesCreateComponent } from './admin-stages/admin-stages-create/admin-stages-create.component';
import { AdminStagesEditComponent } from './admin-stages/admin-stages-edit/admin-stages-edit.component';
import { AdminUnitsComponent } from './admin-units/admin-units.component';
import { AdminUnitsCreateComponent } from './admin-units/admin-units-create/admin-units-create.component';
import { AdminUnitsEditComponent } from './admin-units/admin-units-edit/admin-units-edit.component';
import { AdminPositionsComponent } from './admin-positions/admin-positions.component';
import { AdminPositionsCreateComponent } from './admin-positions/admin-positions-create/admin-positions-create.component';
import { AdminPositionsEditComponent } from './admin-positions/admin-positions-edit/admin-positions-edit.component';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [AdminPerformancesComponent, 
                 AdminHomeComponent, 
                 AdminPerformancesComponent, 
                 AdminEmployeesComponent, 
                 AdminUsersComponent, 
                 AdminLoginComponent, 
                 AdminComponent, 
                 AdminHeaderComponent, 
                 AdminFooterComponent, 
                 AdminNavComponent, 
                 AdminAuthenticationComponent,
                 AdminSeancesComponent,
                 AdminStagesComponent,
                 AdminCategoryPlacesComponent,
                 AdminSeasonsComponent,
                 AdminCategoryPlacesCreateComponent,
                 AdminCategoryPlacesEditComponent,
                 AdminEmployeesEditComponent,
                 AdminEmployeesCreateComponent,
                 AdminPerformancesCreateComponent,
                 AdminPerformancesEditComponent,
                 AdminSeasonsEditComponent,
                 AdminSeasonsCreateComponent,
                 AdminUsersCreateComponent,
                 AdminUsersEditComponent,
                 AdminStagesCreateComponent,
                 AdminStagesEditComponent,
                 AdminUnitsComponent,
                 AdminUnitsCreateComponent,
                 AdminUnitsEditComponent,
                 AdminPositionsComponent,
                 AdminPositionsCreateComponent,
                 AdminPositionsEditComponent],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
