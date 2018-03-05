
export class User {
  public id;
  public cid;
  public gender;
  public tel;
  public pos;
  public user;
  public name;
  public carId;
  public carName;
  type: string;
  address: string;
  email: string;
  company: string;

  constructor(){
  }
}



export class Worklist {
  public id;
  public assId;
  public status;
  public payment;
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

  constructor(id,payment){
    this.id = id;
    this.payment = payment;
  }
}


export class Order{
  public id;
  public status;
  public payment;
  public packages : Array<Package>;
  driver: string;
  officer: string;
  date: string;
  car: string;
  deliveryDate: string;
  recieveDate: string;
  deliveryLocation: string;
  recieveLocation: string;
  constructor(id,payment){
    this.id = id;
    this.payment = payment;
  }
}



export class Package {
  public id;
  public name;
  public statusText;
  public status;
  public category;
  public receiveLog;
  public startSendlogs;
  public storedLogs;
  public storedLocationLogs;
  public finishLogs;
  constructor(id,name,status,){
    this.id = id;
    this.name = name;
    switch(status){
      case 0 : this.statusText = "กำลังไปรับสินค้า";break;
      case 1 : this.statusText = "ได้รับสินค้าแล้ว";break;
      case 2 : this.statusText = "อยู่ระหว่างพักสินค้า";break;
      case 3 : this.statusText = "กำลังจัดส่งสินค้า";break;
      case 4 : this.statusText = "จัดส่งเรียบร้อยแล้ว";break;
    }
  }
}

