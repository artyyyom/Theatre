import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesCreateComponent } from './admin-employees-create.component';

describe('AdminEmployeesCreateComponent', () => {
  let component: AdminEmployeesCreateComponent;
  let fixture: ComponentFixture<AdminEmployeesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
