import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {ErrorsModule} from './shared/core/errors';
import {NotificationService} from './shared/core/services/notification/notification.service';
import { CoreModule } from './shared/core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './authentication/login/login.component';
import { AuthModule } from './authentication/auth.module';
import { HttpModule } from '@angular/http';


registerLocaleData(localeRU);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    SystemModule,
    ErrorsModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru' },
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
