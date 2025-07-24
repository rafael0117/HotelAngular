import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLimpiezaListComponent } from './personal-limpieza-list.component';

describe('PersonalLimpiezaListComponent', () => {
  let component: PersonalLimpiezaListComponent;
  let fixture: ComponentFixture<PersonalLimpiezaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLimpiezaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalLimpiezaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
