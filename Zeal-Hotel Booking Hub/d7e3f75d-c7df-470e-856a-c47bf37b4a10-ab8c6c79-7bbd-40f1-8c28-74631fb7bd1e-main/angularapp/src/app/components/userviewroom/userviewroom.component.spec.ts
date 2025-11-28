import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserviewroomComponent } from './userviewroom.component';

describe('UserviewroomComponent', () => {
  let component: UserviewroomComponent;
  let fixture: ComponentFixture<UserviewroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewroomComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewroom_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_available_rooms_in_userviewroom_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Available Rooms');
  });
});
