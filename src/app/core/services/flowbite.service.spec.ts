import { TestBed } from '@angular/core/testing';

import { FlowbiteService } from './core/services/flowbite.service';

describe('FlowbiteService', () => {
  let service: FlowbiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
