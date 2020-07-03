import { Injectable } from '@angular/core';
import { UserCrudModel, PolicyCrudModel } from '../interfaces/index';
import { SearchModel } from '../interfaces/SearchModel';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  constructor() { }

  private policy: PolicyCrudModel;
  private policyCalculate: PolicyCrudModel;
  private SearchModel: SearchModel;

  private user: UserCrudModel;
  private ThisUserProfile: UserCrudModel;
  private agentUser: UserCrudModel;

  private CompanyData = ["Bangkok_Life_Assurance",
    "Krungthai_AXA_Life_Insurance",
    "Generali_Life_Assurance",
    "Chubb_Life_Assurance",
    "Tokio_Marine_Life_Insurance",
    "Dhipaya_Life_Assurance",
    "Thai_Cardif_Assurance",
    "Thai_Samsung_Life_Insurance",
    "Thai_Life_Insurance",
    "SCB_Life_Assurance",
    "Thaire_Life_assurance",
    "Ocean_Life_Insurance",
    "Bui_Life_Insurance",
    "Prudential_Life_Assurance",
    "Phillip_Life_Assurance",
    "Muang_Thai_Life_Assurance",
    "Manulife",
    "Union_Life_Insurance",
    "Allianz_Ayudhya_Assurance",
    "Southeast_Life_Insurance",
    "FWD_Life_Insurance",
    "MBK_Life_Assurance",
    "AIA",
    "Advance_Life_Assurance",
    "specific"]



  public SetPolicyCalculate(policy: PolicyCrudModel) {
    this.policyCalculate = policy;
  }

  public GetPolicyCalculate(): PolicyCrudModel {
    return this.policyCalculate;
  }

  public SetSearchModel(search: SearchModel) {
    this.SearchModel = search;
  }

  public GetSearchModel(): SearchModel {
    return this.SearchModel;
  }

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

  public GetCompanyData(): string[] {
    return this.CompanyData;
  }


}
