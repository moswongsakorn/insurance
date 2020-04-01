import { Injectable } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  constructor() { }

  private user: UserCrudModel;

  public GetUserConfirm(): UserCrudModel {
    return this.user;
  }
  
  public SetUserConfirm(user: UserCrudModel): void {
    this.user = user;
  }
}
