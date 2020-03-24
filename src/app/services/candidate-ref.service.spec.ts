import { TestBed, inject } from '@angular/core/testing';

import { CandidateRefService } from './candidate-ref.service';

describe('CandidateRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateRefService]
    });
  });

  it('should be created', inject([CandidateRefService], (service: CandidateRefService) => {
    expect(service).toBeTruthy();
  }));
});
