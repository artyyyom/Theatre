import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [SystemComponent, HeaderComponent],
  imports: [CommonModule, SystemRoutingModule]
})

export class SystemModule {}
