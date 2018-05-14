import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { ExitGuard } from '../shared/guards/exit/exit.guard';
import { LoginComponent } from '../authentication/login/login.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes = [{path: '', component: AdminComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
