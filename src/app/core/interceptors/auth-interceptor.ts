import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const language = this._translocoService.getActiveLang();
  let newReq = req.clone();

  // if ( this._authService.accessToken)
  // {
  //   newReq = req.clone({
  //     headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken).set('LANG_KEY', language)
  //   });
  // }


  // Response
  return next(newReq).pipe(
    catchError((error) => {

      // Catch '401 Unauthorized' responses
      // @ts-ignore
      if ( error instanceof HttpErrorResponse && (error.status === 401 || (error.url.includes('/account') && error.status === 500 )))
      {
        // Sign out

        // this._authService.signOut();

        // Reload the app
        // location.reload();
      }
      if ( error instanceof HttpErrorResponse && error.status === 403)
      {
        // this._router.navigateByUrl('unlock-session');
      }

      if (error instanceof HttpErrorResponse && error.status === 400 || error.status === 405 || error.status === 500) {
      }

      return throwError(error);
    })
  );
};
