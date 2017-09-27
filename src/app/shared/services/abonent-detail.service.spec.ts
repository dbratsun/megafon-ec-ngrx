import { TestBed, inject } from '@angular/core/testing';

import { AbonentDetailService } from './abonent-detail.service';

describe('AbonentDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonentDetailService]
    });
  });

  it('should be created', inject([AbonentDetailService], (service: AbonentDetailService) => {
    expect(service).toBeTruthy();
  }));
});
