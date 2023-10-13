import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresListComponent } from './stores-list.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
describe('storesListComponent', () => {
  let component: StoresListComponent;
  let fixture: ComponentFixture<StoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
