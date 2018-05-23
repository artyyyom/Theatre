import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageMainComponent } from './stage-main.component';

describe('StageMainComponent', () => {
  let component: StageMainComponent;
  let fixture: ComponentFixture<StageMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
