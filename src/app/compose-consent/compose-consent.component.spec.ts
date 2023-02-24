import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeConsentComponent } from './compose-consent.component';

describe('ComposeConsentComponent', () => {
  let component: ComposeConsentComponent;
  let fixture: ComponentFixture<ComposeConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
