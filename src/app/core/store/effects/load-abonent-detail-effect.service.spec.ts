import { TestBed, inject } from '@angular/core/testing';

import { LoadAbonentDetailEffectService } from './load-abonent-detail-effect.service';

describe('LoadAbonentDetailEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadAbonentDetailEffectService]
    });
  });

  it('should be created', inject([LoadAbonentDetailEffectService], (service: LoadAbonentDetailEffectService) => {
    expect(service).toBeTruthy();
  }));
});
