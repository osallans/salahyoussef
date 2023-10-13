import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTierAddComponent } from './company-tier-add.component';

describe('CompanyTierAddComponent', () => {
  let component: CompanyTierAddComponent;
  let fixture: ComponentFixture<CompanyTierAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTierAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
