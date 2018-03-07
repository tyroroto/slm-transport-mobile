import { Component } from '@angular/core';
import {
  AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
} from 'ionic-angular';
import {User} from "../../models/data";
import {ApiProvider} from "../../providers/api/api";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  get loading(): Loading {
    return this._loading;
  }

  set loading(value: Loading) {
    this._loading = value;
  }
  private _loading: Loading;

  public refId : string;
  public user: string;
  public pass: string;
  public pass2: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  presentSuccess() {
    this.loading.dismiss().then();
    let alert = this.alertCtrl.create({
      title: "ลงทะเบียนเรียบร้อยแล้ว",
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present(prompt).then();
  }


  register() {
    if(this.pass != this.pass2){
      this.showError("Password ไม่ตรงกัน");
      return;
    }
    this.presentLoadingDefault();
    this.api.currentUser = new User();
    this.api.register(this.refId, this.user, this.pass).toPromise().then(response => {
      try {
        response = JSON.parse(response);
        console.log(response);
        this.presentSuccess();
      } catch (e) {
        this.showError(response);
      }

    }).catch(e => {
      console.warn(e);
      this.showError("");
    });

  }

  presentLoadingDefault() {
    this._loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this._loading.present().catch(e => console.error(e));

    setTimeout(() => {
    }, 5000);
  }

  dismissLoading() {
    this._loading.dismiss().catch(e => console.error(e));
  }

  showError(text) {
    this.dismissLoading();
    console.info(text);
    let alert = this.alertCtrl.create({
      title: "ผิดพลาด !",
      subTitle: 'กรุณาลองอีกครั้ง ' + text,
      buttons: ["OK"]
    });
    alert.present(prompt).then();
  }

}
