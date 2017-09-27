import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonentDetailViewComponent } from './abonent-detail-view.component';

describe('AbonentDetailViewComponent', () => {
  let component: AbonentDetailViewComponent;
  let fixture: ComponentFixture<AbonentDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonentDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
