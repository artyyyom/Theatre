import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonsCreateComponent } from './admin-seasons-create.component';

describe('AdminSeasonsCreateComponent', () => {
  let component: AdminSeasonsCreateComponent;
  let fixture: ComponentFixture<AdminSeasonsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
