import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {ErrorsModule} from './shared/core/errors';
import {NotificationService} from './shared/core/services/notification/notification.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SystemModule,
    ErrorsModule,
  ],
  providers: [
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
