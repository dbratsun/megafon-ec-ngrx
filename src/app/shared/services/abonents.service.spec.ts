import { TestBed, inject } from '@angular/core/testing';

import { AbonentsService } from './abonents.service';

describe('AbonentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonentsService]
    });
  });

  it('should be created', inject([AbonentsService], (service: AbonentsService) => {
    expect(service).toBeTruthy();
  }));
});
