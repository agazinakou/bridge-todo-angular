import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: any) => {
      var message = '';
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          message = 'Unauthorized';
        } else {
          message = 'HTTP error';
        }
      } else {
        message = 'An error occurred';
      }
      Swal.fire({
        title: message,
        icon: 'error',
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        toast: true
      })
      return throwError(() => err);
    })
  );
};
