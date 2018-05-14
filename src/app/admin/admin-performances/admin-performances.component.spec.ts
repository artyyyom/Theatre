import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerformancesComponent } from './admin-performances.component';

describe('AdminPerformancesComponent', () => {
  let component: AdminPerformancesComponent;
  let fixture: ComponentFixture<AdminPerformancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPerformancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
