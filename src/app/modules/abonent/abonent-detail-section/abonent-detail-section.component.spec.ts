import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonentDetailSectionComponent } from './abonent-detail-section.component';

describe('AbonentDetailSectionComponent', () => {
  let component: AbonentDetailSectionComponent;
  let fixture: ComponentFixture<AbonentDetailSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonentDetailSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonentDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
