import { TestBed } from '@angular/core/testing';

import { FormGroupMakerService } from './form-group-maker.service';

describe('FormGroupMakerService', () => {
  let service: FormGroupMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGroupMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
