import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { User } from '../../../../core/models/user';
import { environment } from '../../../../../environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user and return response', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'password',
      id: '',
      name: '',
      email_verified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };
    const mockResponse = { message: 'User registered successfully' };

    service.register(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle register error', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'password',
      id: '',
      name: '',
      email_verified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };
    const mockError = { status: 400, statusText: 'Bad Request' };

    service.register(mockUser).subscribe({
      next: () => fail('expected an error, not response'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(null, mockError);
  });
});
