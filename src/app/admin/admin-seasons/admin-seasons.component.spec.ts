import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeasonsComponent } from './admin-seasons.component';

describe('AdminSeasonsComponent', () => {
  let component: AdminSeasonsComponent;
  let fixture: ComponentFixture<AdminSeasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
