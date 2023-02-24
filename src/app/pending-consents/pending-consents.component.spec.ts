import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingConsentsComponent } from './pending-consents.component';

describe('PendingConsentsComponent', () => {
  let component: PendingConsentsComponent;
  let fixture: ComponentFixture<PendingConsentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingConsentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingConsentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
