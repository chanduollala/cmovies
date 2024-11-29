import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOutlineComponent } from './select-outline.component';

describe('InputOutlineComponent', () => {
  let component: SelectOutlineComponent;
  let fixture: ComponentFixture<SelectOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectOutlineComponent]
    });
    fixture = TestBed.createComponent(SelectOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
