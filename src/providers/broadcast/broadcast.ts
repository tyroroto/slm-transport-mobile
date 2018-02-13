import {EventEmitter, Injectable} from "@angular/core";

/*
  Generated class for the QueueProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BroadcastProvider {
  constructor(){
    console.log("BroadcastProvider");
  }
  public events = new EventEmitter<any>();
  /**
   * emit event with object BroadcastData structure
   * @param bd
   */
  emit(bd: object) {
    console.info("emit", bd);
    this.events.emit(bd);
  }
}

/**
 * DataStructure for passing data in broadcast
 */
export class BroadcastData<T> {
  target: string;
  objective: string;
  data: T;

  constructor(target: string, objective: string, data: T) {
    this.target = target;
    this.objective = objective;
    this.data = data;

  }
}
