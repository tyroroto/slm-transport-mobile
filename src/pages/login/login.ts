import {Component} from '@angular/core';
import {
  AlertController, Loading, LoadingController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import {HomePage} from "../home/home";
import {ApiProvider} from "../../providers/api/api";
import {HomeUserPage} from "../home-user/home-user";
import {User} from "../../models/data";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  version: string = "-";
  isShowLogin = false;
  public user: string;
  public pass: string;
  lds = {
    username: "",
    password: "",
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public api: ApiProvider,
              private platform: Platform) {
    platform.ready().then(() => {
      this.isShowLogin = true
    });
  }

  ionViewDidLoad() {

  }


  signin() {
    // if(this.user.value == "admin" && this.pass.value == "1234"){
    // if (this.user.length == 1) {
    //   this.lds.username = "violet";
    //   this.lds.password = "1111";
    // } else {
    //   this.lds.username = this.user;
    //   this.lds.password = this.pass;
    // }
    this.lds.username = this.user;
    this.lds.password = this.pass;
    this.presentLoadingDefault();
    this.api.currentUser = new User();
    this.api.login(this.lds.username, this.lds.password).toPromise().then(response => {
      try {
        response = JSON.parse(response);
        console.log(response);
        this.api.currentUser.type = response["type"];
        if (this.api.currentUser.type == "emp") {
          this.api.currentUser.id = response["Emp_id"];
          this.api.currentUser.cid = response["Emp_card"];
          this.api.currentUser.name = response["Emp_name"];
          this.api.currentUser.tel = response["Emp_tel"];
          this.api.currentUser.pos = response["Emp_pos"];
          this.api.currentUser.carId = response["Car_id"];
          this.api.currentUser.carName = response["car"]?response["car"]["Car_name"] : "";
          this.api.currentUser.gender = response["Emp_sex"];
        }else{
          this.api.currentUser.id = response["Cus_id"];
          this.api.currentUser.name = response["Cus_name"];
          this.api.currentUser.address = response["Cus_add"];
          this.api.currentUser.email = response["Cus_mail"];
          this.api.currentUser.company = response["Cus_company"];
          this.api.currentUser.tel = response["Cus_tel"];
          this.api.currentUser.gender = response["Cus_sex"];
        }
        this.api.role = response["type"];
        if (this.api.role == "cus") {
          this.navCtrl.setRoot(HomeUserPage);
        } else {
          this.navCtrl.setRoot(HomePage);
        }
      } catch (e) {
        this.showError(response);
      }

    }).catch(e => {
      console.warn(e);
      this.showError("");
    });

  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present().catch(e => console.error(e));

    setTimeout(() => {
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

  openRegister() {
    this.navCtrl.push(RegisterPage).catch(e=>console.error(e));
  }
}
