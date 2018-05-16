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

const routes = [{path: '', component: AdminHomeComponent, canActivate: [AuthGuard]},
                {path: 'performances', component: AdminPerformancesComponent, canActivate: [AuthGuard]},
                {path: 'performances/create', component: AdminPerformancesCreateComponent, canActivate: [AuthGuard]},
                {path: 'performances/edit/:id', component: AdminPerformancesEditComponent, canActivate: [AuthGuard]},
                {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]},
                {path: 'users/create', component: AdminUsersCreateComponent, canActivate: [AuthGuard]},
                {path: 'users/edit/:id', component: AdminUsersEditComponent, canActivate: [AuthGuard]},
                {path: 'employees', component: AdminEmployeesComponent, canActivate: [AuthGuard]},
                {path: 'employees/create', component: AdminEmployeesCreateComponent, canActivate: [AuthGuard]},
                {path: 'employees/edit/:id', component: AdminEmployeesEditComponent, canActivate: [AuthGuard]},
                {path: 'login', component: AdminLoginComponent},
                {path: 'seances', component: AdminSeancesComponent, canActivate: [AuthGuard]},
                {path: 'stages', component: AdminStagesComponent, canActivate: [AuthGuard]},
                {path: 'stages/create', component: AdminStagesCreateComponent, canActivate: [AuthGuard]},
                {path: 'stages/edit/:id', component: AdminStagesEditComponent, canActivate: [AuthGuard]},
                {path: 'category', component: AdminCategoryPlacesComponent, canActivate: [AuthGuard]},
                {path: 'category/create', component: AdminCategoryPlacesCreateComponent, canActivate: [AuthGuard]},
                {path: 'category/edit/:id', component: AdminCategoryPlacesEditComponent, canActivate: [AuthGuard]},
                {path: 'seasons', component: AdminSeasonsComponent, canActivate: [AuthGuard]},
                {path: 'seasons/create', component: AdminSeasonsCreateComponent, canActivate: [AuthGuard]},
                {path: 'seasons/edit/:id', component: AdminSeasonsEditComponent, canActivate: [AuthGuard]},
                {path: 'positions', component: AdminPositionsComponent, canActivate: [AuthGuard]},
                {path: 'positions/create', component: AdminPositionsCreateComponent, canActivate: [AuthGuard]},
                {path: 'positions/edit/:id', component: AdminPositionsEditComponent, canActivate: [AuthGuard]},
                {path: 'units', component: AdminUnitsComponent, canActivate: [AuthGuard]},
                {path: 'units/create', component: AdminUnitsCreateComponent, canActivate: [AuthGuard]},
                {path: 'units/edit/:id', component: AdminUnitsEditComponent, canActivate: [AuthGuard]},
              ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
