import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule, 
    SharedModule,
    ConfirmDialogModule,
  ],
  providers: [
    AuthGuard,
  ],
  declarations: [ProfileOrderComponent]
})
export class UserModule { }
