import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
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
    this.loadData().catch(e=>console.error(e));
  }

  async loadData(){
    this._worklist = [];
    await this.api.getWorklist().toPromise().then(r  => {
      console.log(r);
      let arr : Array<any> = r as Array<any>;
      for(let item of arr){
        let w = new Worklist(item["order"]["Ors_id"], 0);
        w.driver =  item["Emp_car"];
        w.officer= item["Emp_oper"];
        w.date=item["order"]["Ors_date"];// new Date().toLocaleDateString();
        w.status = item["Ass_status"] == null ? null : parseInt(item["Ass_status"]);
        w.deliveryDate = item["order"]["Ors_deliverydate"];//new Date();
        w.recieveDate =  item["order"]["Ors_deliverydateget"];//new Date();
        w.deliveryLocation = item["order"]["Ors_place"];
        w.recieveLocation = item["order"]["Ors_delivery"];
        w.assId= item["Ass_id"];
        w.productName= item["product"]["List_name"];

        w.receiveLog = item["logs"]["receive_log"] ? item["logs"]["receive_log"]["Pro_date"] : null;
        w.startSendlogs = item["logs"]["start_send_log"] ? item["logs"]["start_send_log"]["Sta_date"] : null;
        w.storedLogs = item["logs"]["stored_log"] ? item["logs"]["stored_log"]["Sto_date"] : null;
        w.storedLocationLogs = item["logs"]["stored_log"] ? item["logs"]["stored_log"]["Sto_room"] : null;
        w.finishLogs = item["logs"]["finish_log"] ? item["logs"]["finish_log"]["Des_date"] : null;
        // w.car= "บท-7873";
        console.log(w);
        if(w.status != 3)
          this._worklist.push(w);
      }
      this.worklist = this._worklist;
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.loadData().then(r=> refresher.complete()).catch(e=>{
      console.error(e);refresher.complete()
    });

  }

  onSearch($event: UIEvent) {
    // this.isLoading = true;
    this.worklist = [];
    for(let w of this._worklist){
      if(w.assId.includes(this.searchInput) &&  w.status != 3){
        this.worklist.push(w);
      }
    }
    // setTimeout( () => {
      // this.isLoading = false
    // },2000);
  }

  presentConfirm(w : Worklist,status,t) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: 'ID:'+w.assId+'<p> ชื่อสินค้า </p>'+`<h2> ${w.productName} </h2>`,
      buttons: [
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('confirm');
            this.updateStatus(w,status,"")
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


  doPromptFinish(w : Worklist,status) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันสินค้าถึงปลายทาง',
      subTitle: '<u>กรุณาใส่ชื่อผู้รับสินค้า</u>และกดยืนยัน',
      inputs: [
        {
          name: 'receiver',
          placeholder: 'กรุณาใส่ชื่อผู้รับสินค้า'
        },
      ],
      buttons: [
        {
          text: 'ยืนยัน',
          handler: data => {
            if(data.receiver == null || data.receiver.length < 1 ) return false;
            this.updateStatus(w,status,data.receiver);
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        }

      ]
    });

    alert.present();
  }


  doPrompt(w : Worklist,status) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการพักสินค้า',
      subTitle: '<u>กรุณาเลือกสถานที่</u>และกดยืนยัน',
      inputs: [
        {
          type: 'radio',
          label: 'ท่าเรือแหลมฉบัง',
          value: 'ท่าเรือแหลมฉบัง',
          checked: false
        },{
          type: 'radio',
          label: 'ท่าเรือสัตหีบ',
          value: 'ท่าเรือสัตหีบ',
          checked: false
        },{
          type: 'radio',
          label: 'บริษัทศิลามาศ',
          value: 'บริษัทศิลามาศ',
          checked: false
        },
      ],
      buttons: [
        {
          text: 'ยืนยัน',
          handler: data => {
            if(data == undefined) return false;
              this.updateStatus(w,status,data)
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
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


  showError() {
    this.loading.dismiss().then();
    let alert = this.alertCtrl.create({
      title: "ผิดพลาด !",
      subTitle: 'การยืนยันล้มเหลว โปรดลองใหม่อีกครั้ง',
      buttons: ["OK"]
    });
    alert.present(prompt).then();
  }


  presentSuccess() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันสถานะสำเร็จแล้ว',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('confirm');
          }
        }
      ]
    });
    alert.present();
  }

  getColor(s){
    switch (s){
      case 0 :
        return "#4CAF50";
      case 1 :
        return "#ab78ff";
      case 2 :
        return "#66a3ff";
      case 3 :
        return "#FFCC00";
      default:
        return '#ff3300';
    }
  }

  getSoftColor(s){
    switch (s){
      case 0 :
        return "#eeffee";
      case 1 :
        return "#faefff";
      case 2 :
        return "#f0faff";
      case 3 :
        return "#fdffe0";
      default:
        return "#fff5ea";
    }
  }

  updateStatus(w : Worklist,status,t){
    this.presentLoadingDefault();
    this.api.updateStatus(w.assId,status,t).toPromise().then( r=> {
      console.log (r);
      switch (status){
        case 0:
          w.receiveLog = r["Pro_date"];
          break;
        case 1:
          w.storedLogs = r["Sto_date"];
          break;
        case 2:
          w.startSendlogs = r["Sta_date"];
          break;
        case 3:
          w.finishLogs = r["Des_date"];
          break;
      }
      w.status = status;
      console.log(w);
      this.loading.dismiss().catch(e=>console.error(e));
      this.presentSuccess();
    }).catch(e => {
      this.showError();
    });
  }


}
