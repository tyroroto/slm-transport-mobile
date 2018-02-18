import {Component} from '@angular/core';
import {AlertController, Loading,LoadingController, NavController} from 'ionic-angular';
import {EditInfoPage} from "../edit-info/edit-info";
import {PaymentPage} from "../payment/payment";
import {PackageListPage} from "../package-list/package-list";
import {OrderListPage} from "../order-list/order-list";
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";
import {Worklist} from "../../models/data";

@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html'
})
export class HomeUserPage {
  loading: Loading;
  paymentPage = PaymentPage;
  orderListPage = OrderListPage;
  infoPage = EditInfoPage;
  subscribe;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public broadcast:BroadcastProvider
              ) {
  }

  ionViewDidLoad(){
    this.subscribe = this.broadcast.events.subscribe(next => this.broadcastEventHandler(next));
  }

  broadcastEventHandler(event : BroadcastData<any>){
    if (event.target == "home") {
      if (event.objective == "viewPackage") {
        this.viewPackage(event.data);
      }
    }
  }

  viewPackage( p : Worklist){
    this.navCtrl.push( PackageListPage, { "worklist" : p});
  }
}

