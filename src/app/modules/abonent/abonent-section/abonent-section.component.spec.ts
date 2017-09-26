import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonentSectionComponent } from './abonent-section.component';

describe('AbonentSectionComponent', () => {
  let component: AbonentSectionComponent;
  let fixture: ComponentFixture<AbonentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
