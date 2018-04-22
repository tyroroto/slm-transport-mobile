import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {User} from "../../models/data";
import {LoginPage} from "../login/login";
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";

/**
 * Generated class for the EditInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-info',
  templateUrl: 'edit-info.html',
})
export class EditInfoPage {
  loading: Loading;
  editing: boolean = false;
  tempUserInfo : User = new User();
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public api: ApiProvider,
              public broadcast : BroadcastProvider,
            public alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInfoPage');
    console.log(this.api.currentUser)
  }

  requestEdit(){
    if(!this.editing){
      this.tempUserInfo = Object.assign(this.tempUserInfo, this.api.currentUser);
      this.editing = true;
    }else{
      this.editing = false;
    }

  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังทำการยืนยัน...',
      dismissOnPageChange: true
    });

    this.loading.present().catch(e => console.error(e));
  }

  dismissLoading() {
    this.loading.dismiss().catch(e => console.error(e));
  }

  showError(text) {
    this.loading.dismiss().then();
    console.info(text);
    let alert = this.alertCtrl.create({
      title: "ผิดพลาด !",
      subTitle: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง ' + text,
      buttons: ["OK"]
    });
    alert.present(prompt).then();
  }

  presentConfirm() {
    this.presentLoadingDefault();
    this.api.currentUser = Object.assign(this.api.currentUser, this.tempUserInfo);
    this.api.editProfile().toPromise().then( r=>{
      this.editing = false;
      this.loading.dismiss();
      console.log(r);
    }).catch(e=>{
      console.error(e);
      this.showError("ล้มเหลว");
      this.editing = false;
    });
  }

  representPosition(p){
    switch (p){
      case "0":
        return 'เจ้าของบริษัท';
      case "1":
        return 'ผู้ดูแลระบบ';
      case "2":
        return 'พนักงานทั่วไป';
      case "3":
        return 'พนักงานขับรถ';
      case "4":
        return 'พนักงานโอเปอเรเตอร์';
      default:
        return 'ไม่ระบุ';
    }

  }


}
