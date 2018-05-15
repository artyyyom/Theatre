import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersCreateComponent } from './admin-users-create.component';

describe('AdminUsersCreateComponent', () => {
  let component: AdminUsersCreateComponent;
  let fixture: ComponentFixture<AdminUsersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
