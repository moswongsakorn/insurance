import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataCenterService } from './data-center.service';
import { ResponseModel, PolicyCrudModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    public AngularFireDatabase: AngularFireDatabase,
    public AngularFireAuth: AngularFireAuth,
    public DataCenterService: DataCenterService,
    private translateService: TranslateService
    
  ) { }


  public async InsertPolicy(policy: PolicyCrudModel): Promise<ResponseModel> {
    try {
      if (policy.Key == null || policy.Key == "") {
        policy.Key = (await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push()).key;
        // let resultPush = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push(policy);
        let resultPush = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).set(policy);
        const confirmText: string = this.translateService.instant("CODE.ADD_SUCCESS");
        // เพิ่มข้อมูลเรียบร้อยแล้ว
        return new ResponseModel().Success(confirmText);
      }
      else {
        await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).remove();
        let resultUpdate = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).set(policy);
        const confirmText: string = this.translateService.instant("CODE.EDIT_SUCCESS");
        // แก้ไขเรียบร้อยแล้ว
        return new ResponseModel().Success(confirmText);
      }

    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }


  public GetPolicyListByPin(pin: string): Promise<PolicyCrudModel[]> {
    return new Promise((resolve) => {
      this.AngularFireDatabase.list(MagicNumber.PolicyTable, ref => ref.orderByChild('Pin').equalTo(pin))
        .valueChanges()
        .subscribe(policy => {
          resolve(policy.map(data => data as PolicyCrudModel))
        }, error => {
          resolve(new Array<PolicyCrudModel>())
        })
    })
  }

  public RemovePolicy(key: string): Promise<ResponseModel> {
    return new Promise((resolve) => {
      this.AngularFireDatabase.object(MagicNumber.PolicyTable + "/" + key).remove()
        .then(data => {
          resolve(new ResponseModel().Success(data));
        })
        .catch(error => {
          resolve(new ResponseModel().Failed(error, error.message));
        });
    })
  }

  public RemovePolicyByPin(pin: string): Promise<ResponseModel> {
    return new Promise(async (resolve) => {
      var policyList = await this.GetPolicyListByPin(pin);
      policyList.forEach(policy => {
        var result = this.RemovePolicy(policy.Key);
      });
      resolve(new ResponseModel().Success(null))
    })
  }


}
