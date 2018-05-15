import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryPlacesCreateComponent } from './admin-category-places-create.component';

describe('AdminCategoryPlacesCreateComponent', () => {
  let component: AdminCategoryPlacesCreateComponent;
  let fixture: ComponentFixture<AdminCategoryPlacesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryPlacesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryPlacesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
