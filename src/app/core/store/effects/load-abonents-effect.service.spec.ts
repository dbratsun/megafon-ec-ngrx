import { TestBed, inject } from '@angular/core/testing';

import { LoadAbonentsEffectService } from './load-abonents-effect.service';

describe('LoadAbonentsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadAbonentsEffectService]
    });
  });

  it('should be created', inject([LoadAbonentsEffectService], (service: LoadAbonentsEffectService) => {
    expect(service).toBeTruthy();
  }));
});
