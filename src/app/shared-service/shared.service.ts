import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { isNullOrUndefined } from 'util';
import { of, Observable } from 'rxjs';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient, private alert: AlertService) {
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public post(url: string, body: any | null, options?: {

    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: "response";
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
  }): any {
      console.log("Making authenticated POST call to "+ url);
      return this.httpClient.post(url, body, {
        headers: isNullOrUndefined(options) ? this.getHeader() : (isNullOrUndefined(options.headers) ? this.getHeader() : options.headers),
        observe: isNullOrUndefined(options) ? "response" : (isNullOrUndefined(options.observe)? "response": options.observe),
        params: this.updateParams(options)
      }).pipe(catchError(this.logError));

  }

  public getHeader(contentType?: string): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", isNullOrUndefined(contentType)? "application/json": contentType);
  }

  updateParams(options?: any): HttpParams {
    let param: HttpParams;
    if (isNullOrUndefined(options) || isNullOrUndefined(options.params)) {
      param = new HttpParams();
    }
    else {
      param = options.params;
    }

    //param = param.set("t", Date.now().toString());
    return param;
  }

  private logError(error: any): Observable<any> {
    let errorMessage = "";
    try {
      if (error.status === 401) {
        errorMessage = "An unauthorized request has been detected, please use the 'get inspired button' to allow this application to retrieve instagram feeds";
        console.log(errorMessage);
        setTimeout(() => {
          const a: any = document.createElement("A");
          const windowOrigin = window.location.origin;
          a.href = windowOrigin + (windowOrigin.indexOf("localhost") > -1 ? "/home" : "/home");
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 2500);

      } else {
        
        console.error(JSON.stringify(error));
        errorMessage = "There was an issue processing your request, please try again";
      }
    } catch (err) {
      errorMessage = err.message;
    }

    console.error(errorMessage);

    if (!isNullOrUndefined(this.alert)) {
      this.alert.warning(errorMessage);
    }
    return of(error);
  }
}
