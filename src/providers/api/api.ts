import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Package} from "../../pages/home-user/home-user";
import {User} from "../../models/data";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {


  //transporter //user //
  // role : string = "user";
  role : string = "officer";
  username : string = "";
  password : string = "";
  currentUser : User = new User();
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  public login(user,pass){
    let form = new FormData();
    form.append("password" , pass);
    form.append("username" , user);
    this.username =user;
    this.password =pass;
    return this.http.post("api/api_login",form,{responseType: 'text'});
  }

  public getWorklist(){
    let form = new FormData();
    form.append("password" , this.password );
    form.append("username" , this.username);
    return this.http.post("api/api_worklist",form);
  }

  public editProfile(){
    let form = new FormData();
    console.log(this.currentUser.cid );
    form.append("Emp_id" , this.currentUser.id );
    form.append("Emp_name" , this.currentUser.name );
    form.append("Emp_tel" , this.currentUser.tel );
    form.append("Emp_sex" , this.currentUser.gender );
    form.append("Emp_card" , this.currentUser.cid );
    form.append("type" , "employee");
    //type='customer' ,Cus_id ,Cus_name ,Cus_tel ,Cus_sex
    return this.http.post("api/api_edit_profile",form);

  }


}



export class Worklist {
  public id;
  public status;
  public payment;
  public packages : Array<Package>;
  driver: string;
  officer: string;
  date: string;
  car: string;
  deliveryDate: Date;
  recieveDate: Date;
  deliveryLocation: string;
  recieveLocation: string;

  constructor(id,payment,status){
    this.id = id;
    this.payment = payment;
    switch(status){
      case 0 : this.status = "รอการชำระเงิน";break;
      case 1 : this.status = "อยู่ระหว่างดำเนินงาน";break;
      case 2 : this.status = "เสร็จสิ้นแล้ว";break;
    }

  }
}

