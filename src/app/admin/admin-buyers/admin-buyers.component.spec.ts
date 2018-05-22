import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyersComponent } from './admin-buyers.component';

describe('AdminBuyersComponent', () => {
  let component: AdminBuyersComponent;
  let fixture: ComponentFixture<AdminBuyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
