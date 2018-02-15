import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

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

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public api: ApiProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInfoPage');
    console.log(this.api.currentUser)
  }


  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังทำการยืนยัน...',
      dismissOnPageChange: true
    });

    this.loading.present().catch(e => console.error(e));

    setTimeout(() => {
      this.navCtrl.pop();
    }, 5000);
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
    this.api.editProfile().toPromise().then( r=>{
      this.loading.dismiss();
      console.log(r);
    }).catch(e=>console.error(e));
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
