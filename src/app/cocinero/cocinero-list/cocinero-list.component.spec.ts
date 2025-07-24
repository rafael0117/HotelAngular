import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocineroListComponent } from './cocinero-list.component';

describe('CocineroListComponent', () => {
  let component: CocineroListComponent;
  let fixture: ComponentFixture<CocineroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocineroListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocineroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
