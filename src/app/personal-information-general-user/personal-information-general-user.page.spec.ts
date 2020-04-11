import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalInformationGeneralUserPage } from './personal-information-general-user.page';

describe('PersonalInformationGeneralUserPage', () => {
  let component: PersonalInformationGeneralUserPage;
  let fixture: ComponentFixture<PersonalInformationGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInformationGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInformationGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
