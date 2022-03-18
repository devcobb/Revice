import { TestBed } from '@angular/core/testing';
import { ErrorMessagesService } from './error-messages-service.service';


describe('ErroMessagesServiceService', () => {
  let service: ErrorMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
