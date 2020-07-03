import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataCenterService } from './data-center.service';
import { ResponseModel, PolicyCrudModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    public AngularFireDatabase: AngularFireDatabase,
    public AngularFireAuth: AngularFireAuth,
    public DataCenterService: DataCenterService
  ) { }


  public async InsertPolicy(policy: PolicyCrudModel): Promise<ResponseModel> {
    try {
      if (policy.Key == null || policy.Key == "") {
        policy.Key = (await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push()).key;
        // let resultPush = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push(policy);
        let resultPush = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).set(policy);
        return new ResponseModel().Success("เพิ่มข้อมูลเรียบร้อยแล้ว");
      }
      else {
        await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).remove();
        let resultUpdate = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).set(policy);
        return new ResponseModel().Success("แก้ไขเรียบร้อยแล้ว");
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
        this.RemovePolicy(policy.Key);
      });
      resolve(new ResponseModel().Success(null))
    })
  }


}
