import { TestBed, inject } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'ngx-alerts';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService,
      HttpClient,
      AlertService]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));
});
