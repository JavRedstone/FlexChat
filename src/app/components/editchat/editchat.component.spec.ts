import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchatComponent } from './editchat.component';

describe('EditchatComponent', () => {
  let component: EditchatComponent;
  let fixture: ComponentFixture<EditchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
