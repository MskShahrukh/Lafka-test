import { TestBed } from '@angular/core/testing';

import { WebHttpService } from './web-http.service';

describe('WebHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebHttpService = TestBed.get(WebHttpService);
    expect(service).toBeTruthy();
  });
});
