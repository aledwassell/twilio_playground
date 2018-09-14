import { TestBed, inject } from '@angular/core/testing';

import { ServerConnectorService } from './server-connector.service';

describe('ServerConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerConnectorService]
    });
  });

  it('should be created', inject([ServerConnectorService], (service: ServerConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
