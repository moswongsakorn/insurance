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
      console.log(policy)

      if (policy.Key == null || policy.Key == "") {
        console.log("pushhhhhhhhhhh")
        policy.Key = (await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push()).key;
        var resultPush = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).push(policy);
        return new ResponseModel().Success(resultPush);
      }
      else {
        console.log('Updateeeee')
        var resultUpdate = await this.AngularFireDatabase.database.ref(MagicNumber.PolicyTable).child(policy.Key).set(policy);
        return new ResponseModel().Success(resultUpdate);
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


}
