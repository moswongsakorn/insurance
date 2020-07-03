import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyInputCalculatePage } from './policy-input-calculate.page';

describe('PolicyInputCalculatePage', () => {
  let component: PolicyInputCalculatePage;
  let fixture: ComponentFixture<PolicyInputCalculatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyInputCalculatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputCalculatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
