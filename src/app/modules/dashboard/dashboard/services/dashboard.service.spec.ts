import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '../../../../../environments/environment';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()],
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

  it('should fetch resume data', () => {
    const mockResponse = { data: 'resume data' };

    service.getResume().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/resume`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error during resume data fetch', () => {
    const mockError = { status: 500, statusText: 'Server Error' };

    service.getResume().subscribe(
      () => {
        fail('Expected an error, not resume data');
      },
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/resume`);
    req.flush(null, mockError);
  });
});
