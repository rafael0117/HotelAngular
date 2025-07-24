import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocineroFormComponent } from './cocinero-form.component';

describe('CocineroFormComponent', () => {
  let component: CocineroFormComponent;
  let fixture: ComponentFixture<CocineroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocineroFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocineroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
