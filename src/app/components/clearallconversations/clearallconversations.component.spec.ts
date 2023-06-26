import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearallconversationsComponent } from './clearallconversations.component';

describe('ClearallconversationsComponent', () => {
  let component: ClearallconversationsComponent;
  let fixture: ComponentFixture<ClearallconversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearallconversationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearallconversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
