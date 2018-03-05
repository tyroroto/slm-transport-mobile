import {Component} from '@angular/core';
import {AlertController, Loading,LoadingController, NavController} from 'ionic-angular';
import {EditInfoPage} from "../edit-info/edit-info";
import {PaymentPage} from "../payment/payment";
import {PackageListPage} from "../package-list/package-list";
import {OrderListPage} from "../order-list/order-list";
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";
import {Package, Worklist} from "../../models/data";
import {LoginPage} from "../login/login";

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

  viewPackage( p : Array<Package>){
    this.navCtrl.push( PackageListPage, { "packages" : p});
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: "ต้องการออกจากระบบ",
      buttons: [
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('confirm');
            this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}

