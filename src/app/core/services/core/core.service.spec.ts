import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreService } from './core.service';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

describe('CoreService', () => {
  let service: CoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoreService]
    });

    service = TestBed.inject(CoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize currentUserSubject with user data on success', async () => {
      const mockResponse = { user: {
        email: 'test@example.com',
        password: 'password',
        id: '',
        name: '',
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
       } };

      service.init().then(() => {
        return expect(service.currentUserSubject.value).toEqual(mockResponse.user);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/me`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should reject the promise on error', async () => {
      const mockError = { status: 500, statusText: 'Server Error' };

      try {
        await service.init();
        fail('expected an error, not success');
      } catch (error) {
        expect(error).toBeUndefined();
      }

      const req = httpMock.expectOne(`${environment.apiUrl}/me`);
      expect(req.request.method).toBe('GET');
      req.flush(null, mockError);
    });
  });
});
