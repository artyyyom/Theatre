import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeancesEditComponent } from './admin-seances-edit.component';

describe('AdminSeancesEditComponent', () => {
  let component: AdminSeancesEditComponent;
  let fixture: ComponentFixture<AdminSeancesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeancesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeancesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
