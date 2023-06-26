import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletechatComponent } from './deletechat.component';

describe('DeletechatComponent', () => {
  let component: DeletechatComponent;
  let fixture: ComponentFixture<DeletechatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletechatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
