import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PackageStatusPage} from "../package-status/package-status";
import {ApiProvider} from "../../providers/api/api";
import {Package} from "../../models/data";

/**
 * Generated class for the PackageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-package-list',
  templateUrl: 'package-list.html',
})
export class PackageListPage {


  packages: Array<Package> = [

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.packages = this.navParams.get("packages");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageListPage');

  }
  viewPackage( p : Package){
    this.navCtrl.push( PackageStatusPage , { "package" : p});
  }


  getImage(p: Package) {
    if(p.receiveLog == null) return "assets/imgs/step1.png";
    if(p.receiveLog != null && p.storedLogs == null && p.startSendlogs == null) return "assets/imgs/step1-done.png";
    if(p.storedLogs != null && p.startSendlogs == null) return "assets/imgs/stock-done.png";
    if(p.startSendlogs== null && p.finishLogs == null) return "assets/imgs/delivery-done.png";
    if(p.finishLogs != null) return "assets/imgs/isdone-done.png";}

}
