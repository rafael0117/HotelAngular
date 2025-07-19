import { TestBed } from '@angular/core/testing';

import { PersonalLimpiezaService } from './personal-limpieza.service';

describe('PersonalLimpiezaService', () => {
  let service: PersonalLimpiezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalLimpiezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
