import { Injectable } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  constructor() { }

  private user: UserCrudModel;

  private ThisUserProfile: UserCrudModel;

  public CloneUserCrudModel(): UserCrudModel {
    var clone = new UserCrudModel();
    clone.MapData(this.user);
    return clone;
  }

  public GetUserCrudModel(): UserCrudModel {
    return this.user;
  }

  public SetUserCrudModel(user: UserCrudModel): void {
    this.user = user;
  }

  public SetThisUserProfile(user: UserCrudModel): void {
    this.ThisUserProfile = user;
    localStorage.setItem("User",JSON.stringify(this.ThisUserProfile))
  }

  public GetThisUserProfile(): UserCrudModel {
    this.ThisUserProfile = JSON.parse(localStorage.getItem("User"))
    return this.ThisUserProfile;
  }
}
