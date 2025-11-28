import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserviewmybookingComponent } from './userviewmybooking.component';

describe('UserviewmybookingComponent', () => {
  let component: UserviewmybookingComponent;
  let fixture: ComponentFixture<UserviewmybookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewmybookingComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewmybookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewmybooking_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_my_bookings_in_userviewmybooking_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('My Bookings');
  });
});
