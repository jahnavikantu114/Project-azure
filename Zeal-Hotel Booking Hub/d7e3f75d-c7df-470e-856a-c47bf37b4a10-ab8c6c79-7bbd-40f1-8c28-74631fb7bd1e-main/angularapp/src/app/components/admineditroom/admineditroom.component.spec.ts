import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditroomComponent } from './admineditroom.component';

describe('AdmineditroomComponent', () => {
  let component: AdmineditroomComponent;
  let fixture: ComponentFixture<AdmineditroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
