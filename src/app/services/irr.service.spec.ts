import { TestBed } from '@angular/core/testing';

import { IrrService } from './irr.service';

describe('IrrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IrrService = TestBed.get(IrrService);
    expect(service).toBeTruthy();
  });
});
