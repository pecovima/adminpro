import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AaccountSettingsComponent } from './aaccount-settings.component';

describe('AaccountSettingsComponent', () => {
  let component: AaccountSettingsComponent;
  let fixture: ComponentFixture<AaccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AaccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
