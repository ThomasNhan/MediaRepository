import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemediaComponent } from './createmedia.component';

describe('CreatemediaComponent', () => {
  let component: CreatemediaComponent;
  let fixture: ComponentFixture<CreatemediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
