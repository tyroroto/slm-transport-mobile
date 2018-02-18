import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Worklist} from "../../models/data";

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {


  worklist: Array<Worklist> = [
    new Worklist("0001", 0),
    new Worklist("0002", 1),
    new Worklist("0003", 1),
    new Worklist("0004",1),
    new Worklist("0005", 1),
    new Worklist("0006", 1),
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  getColor(p: Worklist) {
    console.log(p)
    return p.payment == 1? 'secondary': 'danger';
  }
}
