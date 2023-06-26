import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearchathistoryComponent } from './clearchathistory.component';

describe('ClearchathistoryComponent', () => {
  let component: ClearchathistoryComponent;
  let fixture: ComponentFixture<ClearchathistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearchathistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearchathistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
