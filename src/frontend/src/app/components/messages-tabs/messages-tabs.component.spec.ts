import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTabsComponent } from './messages-tabs.component';

describe('MessagesTabsComponent', () => {
  let component: MessagesTabsComponent;
  let fixture: ComponentFixture<MessagesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
