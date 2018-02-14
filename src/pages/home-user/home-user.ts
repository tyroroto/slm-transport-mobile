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


export class Package {
  public id;
  public name;
  public status;
  constructor(id,name,status,){
    this.id = id;
    this.name = name;
    switch(status){
      case 0 : this.status = "กำลังไปรับสินค้า";break;
      case 1 : this.status = "ได้รับสินค้าแล้ว";break;
      case 2 : this.status = "อยู่ระหว่างพักสินค้า";break;
      case 3 : this.status = "กำลังจัดส่งสินค้า";break;
      case 4 : this.status = "จัดส่งเรียบร้อยแล้ว";break;
    }

  }
}
