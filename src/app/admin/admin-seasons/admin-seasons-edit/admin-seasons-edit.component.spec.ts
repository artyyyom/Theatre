import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonsEditComponent } from './admin-seasons-edit.component';

describe('AdminSeasonsEditComponent', () => {
  let component: AdminSeasonsEditComponent;
  let fixture: ComponentFixture<AdminSeasonsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
