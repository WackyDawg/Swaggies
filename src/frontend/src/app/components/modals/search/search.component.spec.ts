import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SEARCHComponent } from './search.component';

describe('SEARCHComponent', () => {
  let component: SEARCHComponent;
  let fixture: ComponentFixture<SEARCHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SEARCHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SEARCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
