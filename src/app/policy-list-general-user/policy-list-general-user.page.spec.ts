import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyListGeneralUserPage } from './policy-list-general-user.page';

describe('PolicyListGeneralUserPage', () => {
  let component: PolicyListGeneralUserPage;
  let fixture: ComponentFixture<PolicyListGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyListGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
