import { TestBed, inject } from '@angular/core/testing';

import { AbonentService } from './abonent.service';

describe('AbonentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonentService]
    });
  });

  it('should be created', inject([AbonentService], (service: AbonentService) => {
    expect(service).toBeTruthy();
  }));
});
