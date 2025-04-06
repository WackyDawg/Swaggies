import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIcoComponent } from './add-ico.component';

describe('AddIcoComponent', () => {
  let component: AddIcoComponent;
  let fixture: ComponentFixture<AddIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
