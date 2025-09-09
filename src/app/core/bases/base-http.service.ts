import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(protected http: HttpClient) {}

  private createOptions(
    headers?: HttpHeaders | { [header: string]: string | string[] },
    params?: HttpParams | { [param: string]: string | number | boolean },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ) {
    return {
      headers: headers instanceof HttpHeaders ? headers : new HttpHeaders(headers),
      // params: new HttpParams({ fromObject: params as any }),
      params: this.buildHttpParams(params),
      responseType: responseType as any
    };
  }

  get<T>(
    url: string,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ): Observable<T> {
    return this.http.get<T>(url, this.createOptions(headers, params, responseType));
  }

  post<T>(
    url: string,
    body: any,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ): Observable<T> {
    return this.http.post<T>(url, body, this.createOptions(headers, params, responseType));
  }

  put<T>(
    url: string,
    body: any,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ): Observable<T> {
    return this.http.put<T>(url, body, this.createOptions(headers, params, responseType));
  }

  patch<T>(
    url: string,
    body: any,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ): Observable<T> {
    return this.http.patch<T>(url, body, this.createOptions(headers, params, responseType));
  }

  delete<T>(
    url: string,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    responseType: 'json' | 'blob' | 'text' = 'json'
  ): Observable<T> {
    return this.http.delete<T>(url, this.createOptions(headers, params, responseType));
  }

  head<T>(
    url: string,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<T> {
    return this.http.head<T>(url, this.createOptions(headers, params));
  }

  options<T>(
    url: string,
    params?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<T> {
    return this.http.options<T>(url, this.createOptions(headers, params));
  }

  private buildHttpParams(params?: { [param: string]: any }): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    Object.keys(params).forEach(key => {
      const value = params[key];

      if (value === null || value === undefined) {
        return; // bỏ qua
      }

      if (Array.isArray(value)) {
        value.forEach(val => {
          httpParams = httpParams.append(key, this.formatParamValue(val));
        });
      } else {
        httpParams = httpParams.set(key, this.formatParamValue(value));
      }
    });

    return httpParams;
  }

  private formatParamValue(value: any): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    return value.toString();
  }
}
