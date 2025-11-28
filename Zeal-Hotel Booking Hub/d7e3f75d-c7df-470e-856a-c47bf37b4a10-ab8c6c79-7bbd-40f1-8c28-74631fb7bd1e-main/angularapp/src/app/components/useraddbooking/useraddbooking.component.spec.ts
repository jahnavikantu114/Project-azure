
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UseraddbookingComponent } from './useraddbooking.component';

describe('UseraddbookingComponent', () => {
  let component: UseraddbookingComponent;
  let fixture: ComponentFixture<UseraddbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraddbookingComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_useraddbooking_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_booking_request_form_in_useraddbooking_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Booking Request Form');
  });
});
