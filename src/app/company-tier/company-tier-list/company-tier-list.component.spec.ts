import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTierListComponent } from './company-tier-list.component';

describe('CompanyTierListComponent', () => {
  let component: CompanyTierListComponent;
  let fixture: ComponentFixture<CompanyTierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
