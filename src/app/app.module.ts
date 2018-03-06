import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import {LoginPage} from "../pages/login/login";
import {HttpClientModule} from "@angular/common/http";
import {EditInfoPage} from "../pages/edit-info/edit-info";
import {HomeUserPage} from "../pages/home-user/home-user";
import {PackageStatusPage} from "../pages/package-status/package-status";
import {PaymentPage} from "../pages/payment/payment";
import {SchedulePage} from "../pages/schedule/schedule";
import {PackageListPage} from "../pages/package-list/package-list";
import {OrderListPage} from "../pages/order-list/order-list";
import { BroadcastProvider } from '../providers/broadcast/broadcast';
import { AppProvider } from '../providers/app/app';
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    HomeUserPage,
    PackageStatusPage,
    EditInfoPage,
    PaymentPage,
    SchedulePage,
    PackageListPage,
    OrderListPage,
    RegisterPage

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    HomeUserPage,
    ListPage,
    EditInfoPage,
    PackageStatusPage,
    PaymentPage,
    SchedulePage,
    PackageListPage,
    OrderListPage,
    RegisterPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    BroadcastProvider,
    AppProvider
  ]
})
export class AppModule {}
