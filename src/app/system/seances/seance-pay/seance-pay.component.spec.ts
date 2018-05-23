import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancePayComponent } from './seance-pay.component';

describe('SeancePayComponent', () => {
  let component: SeancePayComponent;
  let fixture: ComponentFixture<SeancePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeancePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeancePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
