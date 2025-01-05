import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldComponent } from './admin-field.component';

describe('AdminFieldComponent', () => {
  let component: AdminFieldComponent;
  let fixture: ComponentFixture<AdminFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
