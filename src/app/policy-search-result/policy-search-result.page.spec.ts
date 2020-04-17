import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicySearchResultPage } from './policy-search-result.page';

describe('PolicySearchResultPage', () => {
  let component: PolicySearchResultPage;
  let fixture: ComponentFixture<PolicySearchResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySearchResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicySearchResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
