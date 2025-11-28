import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminviewrequestedbookingComponent } from './adminviewrequestedbooking.component';

describe('AdminviewrequestedbookingComponent', () => {
  let component: AdminviewrequestedbookingComponent;
  let fixture: ComponentFixture<AdminviewrequestedbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewrequestedbookingComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewrequestedbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_adminviewrequestedbooking_component', () => {
    expect(component).toBeTruthy();
  });
});
