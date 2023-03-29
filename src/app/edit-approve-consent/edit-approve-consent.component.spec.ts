import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApproveConsentComponent } from './edit-approve-consent.component';

describe('EditApproveConsentComponent', () => {
  let component: EditApproveConsentComponent;
  let fixture: ComponentFixture<EditApproveConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApproveConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApproveConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
