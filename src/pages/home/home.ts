import  {Component} from '@angular/core';
import {AlertController, Loading,LoadingController, NavController} from 'ionic-angular';
import {EditInfoPage} from "../edit-info/edit-info";
import {SchedulePage} from "../schedule/schedule";
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  schedulePage = SchedulePage
  infoPage = EditInfoPage;
  itemStatus: object;
  itemStatusList: Array<object> = [
    { id : 0 , value : "ได้รับสินค้าแล้ว" },
    { id : 1 , value : "พักสินค้าแล้ว"},
    { id : 2 , value : "สินค้าถึงที่หมาย"},
  ];

  subscribe;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public broadcast : BroadcastProvider
              ) {
    // this.itemStatus = this.itemStatusList[1];
  }


  ionViewDidLoad(){
    this.subscribe = this.broadcast.events.subscribe(next => this.broadcastEventHandler(next));
  }

  broadcastEventHandler(event : BroadcastData<any>){
    if (event.target == "home") {
      if (event.objective == "SchedulePage") {
        this.navCtrl.push(SchedulePage);
      }
      if (event.objective == "Logout") {
        this.navCtrl.setRoot(LoginPage);
      }
    }
  }

}
