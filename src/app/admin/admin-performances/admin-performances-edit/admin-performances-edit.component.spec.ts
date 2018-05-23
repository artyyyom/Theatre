import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerformancesEditComponent } from './admin-performances-edit.component';

describe('AdminPerformancesEditComponent', () => {
  let component: AdminPerformancesEditComponent;
  let fixture: ComponentFixture<AdminPerformancesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPerformancesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPerformancesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
