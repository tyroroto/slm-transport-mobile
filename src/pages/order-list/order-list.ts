import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";
import {Order, Package, Worklist} from "../../models/data";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  orders: Array<Order> = [  ];
  _orders: Array<Order> = [   ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public broadcast: BroadcastProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.loadData().catch(e=>console.error(e));
  }

  async loadData(){
    this._orders = [];
    await this.api.getWorklist().toPromise().then(r  => {
      console.log(r);
      let arr : Array<any> = r as Array<any>;
      for(let item of arr){
        let w = new Order(item["order"]["Ors_id"], 0);
        w.driver =  item["Emp_car"];
        w.officer= item["Emp_oper"];
        w.date=item["order"]["Ors_date"];// new Date().toLocaleDateString();
        w.status = item["order"]["Ors_status"] == null ? 0 : parseInt(item["Ors_status"]);
        w.deliveryDate = item["order"]["Ors_deliverydate"];//new Date();
        w.recieveDate =  item["order"]["Ors_deliverydateget"];//new Date();
        w.deliveryLocation = item["order"]["Ors_place"];
        w.recieveLocation = item["order"]["Ors_delivery"];

        w.packages = [];
        if(item["assignment"]){
          for( let ass of item["assignment"]){
            let p =  new Package(0, ass["product"]["List_name"],ass["Ass_status"]);
            console.log("ASS",ass);
            p.receiveLog = ass["logs"]["receive_log"] ? ass["logs"]["receive_log"]["Pro_date"] : null;
            p.id = ass["product"]["List_id"] ? ass["product"]["List_id"] : "Undefined";
            p.category = ass["product"]["Cat_name"] ? ass["product"]["Cat_name"] : null;
            p.startSendlogs = ass["logs"]["start_send_log"] ? ass["logs"]["start_send_log"]["Sta_date"] : null;
            p.storedLogs = ass["logs"]["stored_log"] ? ass["logs"]["stored_log"]["Sto_date"] : null;
            p.storedLocationLogs = ass["logs"]["stored_log"] ? ass["logs"]["stored_log"]["Sto_room"] : null;
            p.finishLogs = ass["logs"]["finish_log"] ? ass["logs"]["finish_log"]["Des_date"] : null;
            w.packages.push(p);
          }
        }

        // w.car= "บท-7873";
        console.log(w);
        this._orders.push(w);
      }
      this.orders = this._orders;
      console.log(this.orders)
    })
  }


  viewPackage( p : Package){
    this.broadcast.emit(new BroadcastData<Package>("home" ,"viewPackage",p));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.loadData().then(r=> refresher.complete()).catch(e=>{
      console.error(e);refresher.complete()
    });

  }
  searchInput;

  onSearch($event: UIEvent) {
    // this.isLoading = true;
    this.orders = [];
    for(let w of this._orders){
      if(w.id.includes(this.searchInput)){
        this.orders.push(w);
      }
    }
    // setTimeout( () => {
    // this.isLoading = false
    // },2000);
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

  getIndex(o : Order){
    return this.orders.indexOf(o);
  }
}
