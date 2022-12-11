import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyTicketComponent } from './create-modify-ticket.component';

describe('CreateModifyTicketComponent', () => {
  let component: CreateModifyTicketComponent;
  let fixture: ComponentFixture<CreateModifyTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModifyTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModifyTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
