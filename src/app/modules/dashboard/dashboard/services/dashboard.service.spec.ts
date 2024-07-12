import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '../../../../../environments/environment';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return resume data', () => {
    const mockResponse = { summary: 'This is a summary' };

    service.getResume().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/resume`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    const mockError = { status: 500, statusText: 'Server Error' };

    service.getResume().subscribe({
      next: () => fail('expected an error, not response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/resume`);
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });
});
