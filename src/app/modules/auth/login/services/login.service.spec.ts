import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { User } from '../../../../core/models/user';
import { environment } from '../../../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user and return response', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'password',
      id: '',
      name: '',
      email_verified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };
    const mockResponse = { token: 'fake-jwt-token' };

    service.login(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const mockUser: User = {
      email: 'test@example.com', password: 'password',
      id: '',
      name: '',
      email_verified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockError = { status: 401, statusText: 'Unauthorized' };

    service.login(mockUser).subscribe({
      next: () => fail('expected an error, not response'),
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(null, mockError);
  });
});
