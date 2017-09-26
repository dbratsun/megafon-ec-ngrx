import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonentListComponent } from './abonent-list.component';

describe('AbonentListComponent', () => {
  let component: AbonentListComponent;
  let fixture: ComponentFixture<AbonentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
