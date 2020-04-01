import { TestBed } from '@angular/core/testing';

import { DataCenterService } from './data-center.service';

describe('DataCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCenterService = TestBed.get(DataCenterService);
    expect(service).toBeTruthy();
  });
});
