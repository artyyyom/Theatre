import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryPlacesEditComponent } from './admin-category-places-edit.component';

describe('AdminCategoryPlacesEditComponent', () => {
  let component: AdminCategoryPlacesEditComponent;
  let fixture: ComponentFixture<AdminCategoryPlacesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryPlacesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryPlacesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
