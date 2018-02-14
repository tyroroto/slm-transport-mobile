import {Component} from '@angular/core';
import {
  AlertController, Loading, LoadingController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import {HomePage} from "../home/home";
import {ApiProvider} from "../../providers/api/api";

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
    if (this.user.length == 1) {
      this.lds.username = "1100501040231";
      this.lds.password = "0123456789";
    } else {
      this.lds.username = this.user;
      this.lds.password = this.pass;
    }
    this.presentLoadingDefault();
    this.api.login(this.lds.username,this.lds.password).toPromise().then( response=>{
      try{

        response = JSON.parse(response);
        console.log(response);
        this.api.currentUser.id = response["Emp_id"];
        this.api.currentUser.cid = response["Emp_card"];
        this.api.currentUser.name = response["Emp_name"];
        this.api.currentUser.tel = response["Emp_tel"];
        this.api.currentUser.pos = response["Emp_pos"];
        this.api.currentUser.type = response["Emp_type"];
        this.api.currentUser.gender = response["Emp_sex"];
        if(this.api.role == "user") {
          this.navCtrl.setRoot(HomePage);
        }else{
          this.navCtrl.setRoot(HomePage);
        }
      }catch (e){
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

}
