import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateLinkComponent } from './activate-link.component';

describe('ActivateLinkComponent', () => {
  let component: ActivateLinkComponent;
  let fixture: ComponentFixture<ActivateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
