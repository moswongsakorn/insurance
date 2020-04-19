import { Injectable } from '@angular/core';
import { UserCrudModel, PolicyCrudModel } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  constructor() { }

  private policy: PolicyCrudModel;

  private user: UserCrudModel;
  private ThisUserProfile: UserCrudModel;
  private agentUser: UserCrudModel;

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


  public CloneAgentUserCrudModel(): UserCrudModel {
    var clone = new UserCrudModel();
    clone.MapData(this.agentUser);
    return clone;
  }

  public GetAgentUserCrudModel(): UserCrudModel {
    return this.agentUser;
  }

  public SetAgentUserCrudModel(user: UserCrudModel): void {
    this.agentUser = user;
  }

  public SetThisUserProfile(user: UserCrudModel): void {
    this.ThisUserProfile = user;
    localStorage.setItem("User", JSON.stringify(this.ThisUserProfile))
  }

  public GetThisUserProfile(): UserCrudModel {
    this.ThisUserProfile = JSON.parse(localStorage.getItem("User"))
    return this.ThisUserProfile;
  }

  

  public SetPolicyDetail(policy: PolicyCrudModel): void {
    this.policy = policy;
  }

  public GetPolicyDetail(): PolicyCrudModel {
    return this.policy;
  }


  public ClonePolicyDetail(): PolicyCrudModel {
    var clone = new PolicyCrudModel();
    clone.MapData(this.policy);
    return clone;
  }

}
