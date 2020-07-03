import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyDetailCalculatePage } from './policy-detail-calculate.page';

describe('PolicyDetailCalculatePage', () => {
  let component: PolicyDetailCalculatePage;
  let fixture: ComponentFixture<PolicyDetailCalculatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyDetailCalculatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyDetailCalculatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
