import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLimpiezaFormComponent } from './personal-limpieza-form.component';

describe('PersonalLimpiezaFormComponent', () => {
  let component: PersonalLimpiezaFormComponent;
  let fixture: ComponentFixture<PersonalLimpiezaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLimpiezaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalLimpiezaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
