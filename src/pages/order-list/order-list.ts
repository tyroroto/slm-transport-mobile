import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {BroadcastData, BroadcastProvider} from "../../providers/broadcast/broadcast";
import {Worklist} from "../../models/data";

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

  packages: Array<Worklist> = [
    new Worklist("0001", 0,0),
    new Worklist("0002", 1,1),
    new Worklist("0003", 2,2),
    new Worklist("0004", 3,1),
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public broadcast: BroadcastProvider) {
  }


  viewPackage( p : Worklist){
    this.broadcast.emit(new BroadcastData<Worklist>("home" ,"viewPackage",p));
  }

  ionViewDidLoad(){
    console.log("loaded")
  }


}
