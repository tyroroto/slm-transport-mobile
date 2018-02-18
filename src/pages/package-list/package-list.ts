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
    new Package("0001","สินค้าชิ้นที่ 1", 0),
    new Package("0002","สินค้าชิ้นที่ 2", 1),
    new Package("0003","สินค้าชิ้นที่ 3", 2),
    new Package("0004","สินค้าชิ้นที่ 4", 3),
    new Package("0005","สินค้าชิ้นที่ 5", 4),
    new Package("0006","สินค้าชิ้นที่ 6", 4),
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageListPage');

  }
  viewPackage( p : Package){
    this.navCtrl.push( PackageStatusPage , { "package" : p});
  }


}
