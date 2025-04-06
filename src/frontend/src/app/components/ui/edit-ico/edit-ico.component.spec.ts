import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIcoComponent } from './edit-ico.component';

describe('EditIcoComponent', () => {
  let component: EditIcoComponent;
  let fixture: ComponentFixture<EditIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditIcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
