import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SystemComponent} from './system.component';

const routes = [{path: '', component: SystemComponent, children: []}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {

}
