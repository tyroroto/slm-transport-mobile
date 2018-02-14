import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {EditInfoPage} from "../edit-info/edit-info";
import {Worklist} from "../../models/data";

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
  _worklist: Array<Worklist> = [
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
        w.status = item["Ass_status"] == null ? null : parseInt(item["Ass_status"]);
        w.deliveryDate = item["order"]["Ors_deliverydate"];//new Date();
        w.recieveDate =  item["order"]["Ors_deliverydateget"]//new Date();
        w.deliveryLocation = item["order"]["Ors_place"];
        w.recieveLocation = item["order"]["Ors_delivery"];
        w.assId= item["Ass_id"];
        w.car= "บท-7873";
        console.log(w);
        this._worklist.push(w);
      }
      this.worklist = this._worklist;

    })
  }

  onSearch($event: UIEvent) {
    // this.isLoading = true;
    this.worklist = [];
    for(let w of this._worklist){
      if(w.assId.includes(this.searchInput)){
        this.worklist.push(w);
      }
    }
    // setTimeout( () => {
      // this.isLoading = false
    // },2000);
  }



  doPrompt(w : Worklist,status) {
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
          handler: data => {
            console.log(data.place);
            this.updateStatus(w,status,data.place)
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

  showError() {
    this.loading.dismiss().then();
    let alert = this.alertCtrl.create({
      title: "ผิดพลาด !",
      subTitle: 'การยืนยันล้มเหลว โปรดลองใหม่อีกครั้ง',
      buttons: ["OK"]
    });
    alert.present(prompt).then();
  }

  presentConfirm(w : Worklist,status,t) {
    let alert = this.alertCtrl.create({
      title: t,
      // message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('confirm');
            this.updateStatus(w,status,"")
          }
        }
      ]
    });
    alert.present();
  }

  updateStatus(w : Worklist,status,t){
    this.presentLoadingDefault();
    this.api.updateStatus(w.assId,status,t).toPromise().then( r=> {
      w.status = status;
      this.loading.dismiss().catch(e=>console.error(e));
    }).catch(e => {
      this.showError();
    });
  }


}
