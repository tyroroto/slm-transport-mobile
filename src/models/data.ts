import {Package} from "../pages/home-user/home-user";

export class User {
  public id;
  public cid;
  public gender;
  public tel;
  public pos;
  public user;
  public name;
  public carId;
  type: any;

  constructor(){
  }
}



export class Worklist {
  public id;
  public assId;
  public status;
  public payment;
  public packages : Array<Package>;
  public receiveLog;
  public startSendlogs;
  public storedLogs;
  public storedLocationLogs;
  public finishLogs;
  driver: string;
  officer: string;
  date: string;
  car: string;
  deliveryDate: string;
  recieveDate: string;
  deliveryLocation: string;
  recieveLocation: string;
  productName: string;

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

