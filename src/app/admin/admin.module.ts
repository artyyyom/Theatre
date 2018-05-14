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

@NgModule({
  imports: [
    BrowserModule,
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
                 AdminAuthenticationComponent],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
