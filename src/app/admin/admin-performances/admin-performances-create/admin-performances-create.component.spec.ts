import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerformancesCreateComponent } from './admin-performances-create.component';

describe('AdminPerformancesCreateComponent', () => {
  let component: AdminPerformancesCreateComponent;
  let fixture: ComponentFixture<AdminPerformancesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPerformancesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPerformancesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
