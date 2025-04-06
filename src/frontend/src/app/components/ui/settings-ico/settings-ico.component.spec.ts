import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIcoComponent } from './settings-ico.component';

describe('SettingsIcoComponent', () => {
  let component: SettingsIcoComponent;
  let fixture: ComponentFixture<SettingsIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsIcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
