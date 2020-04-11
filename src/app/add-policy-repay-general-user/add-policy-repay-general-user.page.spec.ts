import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPolicyRepayGeneralUserPage } from './add-policy-repay-general-user.page';

describe('AddPolicyRepayGeneralUserPage', () => {
  let component: AddPolicyRepayGeneralUserPage;
  let fixture: ComponentFixture<AddPolicyRepayGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPolicyRepayGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPolicyRepayGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
