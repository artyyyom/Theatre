import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { ExitGuard } from '../shared/guards/exit/exit.guard';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-authentication/admin-login/admin-login.component';
import { AdminPerformancesComponent } from './admin-performances/admin-performances.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminEmployeesComponent } from './admin-employees/admin-employees.component';
import { AdminSeancesComponent } from './admin-seances/admin-seances.component';
import { AdminStagesComponent } from './admin-stages/admin-stages.component';
import { AdminCategoryPlacesComponent } from './admin-category-places/admin-category-places.component';
import { AdminSeasonsComponent } from './admin-seasons/admin-seasons.component';
import { AdminPerformancesCreateComponent } from './admin-performances/admin-performances-create/admin-performances-create.component';
import { AdminPerformancesEditComponent } from './admin-performances/admin-performances-edit/admin-performances-edit.component';
import { AdminUsersCreateComponent } from './admin-users/admin-users-create/admin-users-create.component';
import { AdminUsersEditComponent } from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminEmployeesCreateComponent } from './admin-employees/admin-employees-create/admin-employees-create.component';
import { AdminEmployeesEditComponent } from './admin-employees/admin-employees-edit/admin-employees-edit.component';
import { AdminStagesCreateComponent } from './admin-stages/admin-stages-create/admin-stages-create.component';
import { AdminStagesEditComponent } from './admin-stages/admin-stages-edit/admin-stages-edit.component';
import { AdminCategoryPlacesCreateComponent } from './admin-category-places/admin-category-places-create/admin-category-places-create.component';
import { AdminCategoryPlacesEditComponent } from './admin-category-places/admin-category-places-edit/admin-category-places-edit.component';
import { AdminSeasonsCreateComponent } from './admin-seasons/admin-seasons-create/admin-seasons-create.component';
import { AdminSeasonsEditComponent } from './admin-seasons/admin-seasons-edit/admin-seasons-edit.component';
import { AdminPositionsComponent } from './admin-positions/admin-positions.component';
import { AdminPositionsCreateComponent } from './admin-positions/admin-positions-create/admin-positions-create.component';
import { AdminPositionsEditComponent } from './admin-positions/admin-positions-edit/admin-positions-edit.component';
import { AdminUnitsComponent } from './admin-units/admin-units.component';
import { AdminUnitsCreateComponent } from './admin-units/admin-units-create/admin-units-create.component';
import { AdminUnitsEditComponent } from './admin-units/admin-units-edit/admin-units-edit.component';

const routes = [{path: '', component: AdminHomeComponent},
                {path: 'performances', component: AdminPerformancesComponent},
                {path: 'performances/create', component: AdminPerformancesCreateComponent},
                {path: 'performances/edit/:id', component: AdminPerformancesEditComponent},
                {path: 'users', component: AdminUsersComponent},
                {path: 'users/create', component: AdminUsersCreateComponent},
                {path: 'users/edit/:id', component: AdminUsersEditComponent},
                {path: 'employees', component: AdminEmployeesComponent},
                {path: 'employees/create', component: AdminEmployeesCreateComponent},
                {path: 'employees/edit/:id', component: AdminEmployeesEditComponent},
                {path: 'login', component: AdminLoginComponent},
                {path: 'seances', component: AdminSeancesComponent},
                {path: 'stages', component: AdminStagesComponent},
                {path: 'stages/create', component: AdminStagesCreateComponent},
                {path: 'stages/edit/:id', component: AdminStagesEditComponent},
                {path: 'category', component: AdminCategoryPlacesComponent},
                {path: 'category/create', component: AdminCategoryPlacesCreateComponent},
                {path: 'category/edit/:id', component: AdminCategoryPlacesEditComponent},
                {path: 'seasons', component: AdminSeasonsComponent},
                {path: 'seasons/create', component: AdminSeasonsCreateComponent},
                {path: 'seasons/edit/:id', component: AdminSeasonsEditComponent},
                {path: 'positions', component: AdminPositionsComponent},
                {path: 'positions/create', component: AdminPositionsCreateComponent},
                {path: 'positions/edit/:id', component: AdminPositionsEditComponent},
                {path: 'units', component: AdminUnitsComponent},
                {path: 'units/create', component: AdminUnitsCreateComponent},
                {path: 'units/edit/:id', component: AdminUnitsEditComponent},
              ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
