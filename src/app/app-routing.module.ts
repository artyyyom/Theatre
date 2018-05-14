import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminAuthenticationComponent } from './admin/admin-authentication/admin-authentication.component';

const routes = [{path: '', redirectTo: '/', pathMatch: 'full'},
                {path: 'auth', component: AdminAuthenticationComponent}
               ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
