import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post("api/api_login.php",form,{responseType: 'text'});
  }


  public getWorklist(){
    let form = new FormData();
    form.append("password" , this.password );
    form.append("username" , this.username);
    return this.http.post("api/api_worklist.php",form);
  }

  public editProfile(){
    let form = new FormData();
    console.log(this.currentUser.cid );
    form.append("password" , this.password );
    form.append("username" , this.username);
    form.append("Emp_id" , this.currentUser.id );
    form.append("Emp_name" , this.currentUser.name );
    form.append("Emp_tel" , this.currentUser.tel );
    form.append("Emp_sex" , this.currentUser.gender );
    form.append("Emp_card" , this.currentUser.cid );
    form.append("Car_name" , this.currentUser.carName);
    form.append("type" , this.currentUser.type == "emp" ? "employee" : "customer");
    //type='customer' ,Cus_id ,Cus_name ,Cus_tel ,Cus_sex
    console.log(form);

    return this.http.post("api/api_edit_profile.php",form);

  }

  public updateStatus(id,status,text){
    let form = new FormData();
    form.append("password" , this.password );
    form.append("username" , this.username);
    form.append("Ass_id" , id );
    form.append("Ass_status" , status );
    form.append("text" , text);
    //type='customer' ,Cus_id ,Cus_name ,Cus_tel ,Cus_sex
    return this.http.post("api/api_update_status.php",form);

  }

  register(refId: string, user: string, pass: string) {
    let form = new FormData();
    form.append("refId" , refId );
    form.append("username" , user);
    form.append("password" , pass );
    //type='customer' ,Cus_id ,Cus_name ,Cus_tel ,Cus_sex
    return this.http.post("api/api_update_customer.php",form,{responseType: 'text'});
  }
}


