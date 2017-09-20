import { TestBed, inject } from '@angular/core/testing';

import { LoadUsersEffectService } from './load-users-effect.service';

describe('LoadUsersEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadUsersEffectService]
    });
  });

  it('should be created', inject([LoadUsersEffectService], (service: LoadUsersEffectService) => {
    expect(service).toBeTruthy();
  }));
});
