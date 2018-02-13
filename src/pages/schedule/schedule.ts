import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider, Worklist} from "../../providers/api/api";
import {EditInfoPage} from "../edit-info/edit-info";

/**
 * Generated class for the PackageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  loading: Loading;
  searchInput;
  isLoading: boolean = false;
  worklist: Array<Worklist> = [

  ];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public api: ApiProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.api.getWorklist().toPromise().then(r  => {
      console.log(r);
      let arr : Array<any> = r as Array<any>;
      for(let item of arr){
        let w = new Worklist(item["order"]["Ors_id"], 0,item["order"]["Ors_status"]);
        w.driver =  item["Emp_car"];
        w.officer= item["Emp_oper"];
        w.date=item["order"]["Ors_date"];// new Date().toLocaleDateString();
        w.status = item["order"]["Ors_status"] == null ? null : parseInt(item["order"]["Ors_status"]);
        w.deliveryDate = item["order"]["Ors_deliverydate"];//new Date();
        w.recieveDate =  item["order"]["Ors_deliverydateget"]//new Date();
        w.deliveryLocation = item["order"]["Ors_place"];
        w.recieveLocation = item["order"]["Ors_delivery"];
        w.car= "บท-7873";
        console.log(w);
        this.worklist.push(w);
      }
    })
  }

  onSearch($event: UIEvent) {
    console.log($event);
    this.isLoading = true;
    setTimeout( () => {
      this.isLoading = false
    },2000);
  }



  doPrompt() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการพักสินค้า',
      message: 'กรุณาใส่สถานที่และกดยืนยัน',
      inputs: [
        {
          name: 'place',
          placeholder: 'สถานที่พักสินค้า'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    alert.present();
  }


  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังทำการยืนยัน...',
      dismissOnPageChange: true
    });

    this.loading.present().catch(e => console.error(e));

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  dismissLoading() {
    this.loading.dismiss().catch(e => console.error(e));
  }

  openEditInfo(){
    this.navCtrl.push(EditInfoPage);
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
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'ยืนยันสถานะสินค้า',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('confirm');
            this.presentLoadingDefault();
          }
        }
      ]
    });
    alert.present();
  }


}
