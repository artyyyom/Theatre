import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
