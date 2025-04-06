import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIcoComponent } from './delete-ico.component';

describe('DeleteIcoComponent', () => {
  let component: DeleteIcoComponent;
  let fixture: ComponentFixture<DeleteIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
