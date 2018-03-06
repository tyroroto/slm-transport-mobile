import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Package} from "../../models/data";


/**
 * Generated class for the PackageStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-package-status',
  templateUrl: 'package-status.html',
})
export class PackageStatusPage {
  package : Package;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get("package"));
    this.package = navParams.get("package");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageStatusPage');
  }

  getLocation(l){
    if(l == "0") return "ท่าเรือแหลมฉบัง";
    if(l == "1") return "ท่าเรือสัตหีบ";
    if(l == "2") return "บริษัทศิลามาศ";
    return l;
  }

}
