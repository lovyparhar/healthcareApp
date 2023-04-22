import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedConsentsComponent } from './approved-consents.component';

describe('ApprovedConsentsComponent', () => {
  let component: ApprovedConsentsComponent;
  let fixture: ComponentFixture<ApprovedConsentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedConsentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedConsentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
