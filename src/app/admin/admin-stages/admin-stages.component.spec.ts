import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStagesComponent } from './admin-stages.component';

describe('AdminStagesComponent', () => {
  let component: AdminStagesComponent;
  let fixture: ComponentFixture<AdminStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
