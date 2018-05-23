import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesEditComponent } from './admin-employees-edit.component';

describe('AdminEmployeesEditComponent', () => {
  let component: AdminEmployeesEditComponent;
  let fixture: ComponentFixture<AdminEmployeesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
