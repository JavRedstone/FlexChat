import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewchatComponent } from './newchat.component';

describe('NewchatComponent', () => {
  let component: NewchatComponent;
  let fixture: ComponentFixture<NewchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
