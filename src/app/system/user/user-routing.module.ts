import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';

const routes = [
    {path: '', component: ProfileOrderComponent, canActivate: [AuthGuard]},
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class UserRoutingModule {

}
