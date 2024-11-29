import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoXsComponent } from './user-info-xs.component';

describe('UserInfoXsComponent', () => {
  let component: UserInfoXsComponent;
  let fixture: ComponentFixture<UserInfoXsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoXsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
