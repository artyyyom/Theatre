import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';


@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule, 
  ],
  providers: [
    AuthGuard,
  ],
  declarations: [ProfileOrderComponent]
})
export class UserModule { }
