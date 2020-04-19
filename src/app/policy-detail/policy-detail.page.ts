import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { PolicyCrudModel } from '../interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.page.html',
  styleUrls: ['./policy-detail.page.scss'],
})
export class PolicyDetailPage implements OnInit {


  public policy: PolicyCrudModel = new PolicyCrudModel();
  constructor(
    private DataCenterService: DataCenterService,
    private NavController: NavController
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.policy = this.DataCenterService.GetPolicyDetail();
  }

  Edit() {
    this.NavController.navigateForward(['add-policy-general-user']);
  }

}
