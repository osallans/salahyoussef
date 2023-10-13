import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShowcasesComponent } from './all-showcases.component';

describe('AllShowcasesComponent', () => {
  let component: AllShowcasesComponent;
  let fixture: ComponentFixture<AllShowcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllShowcasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShowcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
