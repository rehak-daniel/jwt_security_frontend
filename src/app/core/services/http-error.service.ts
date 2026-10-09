import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { VALIDATION_MESSAGES } from '../constants/error-messages';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  public parseError(err: HttpErrorResponse): string {
    if (!err.error) {
      return VALIDATION_MESSAGES.GENERIC_ERROR;
    }

    const responseData = err.error;

    if (typeof responseData === 'object' && !responseData.message) {
      const firstFieldKey = Object.keys(responseData)[0];
      return responseData[firstFieldKey] || VALIDATION_MESSAGES.GENERIC_ERROR;
    } 

    if (responseData.message) {
      return responseData.message;
    }

    return VALIDATION_MESSAGES.GENERIC_ERROR;
  }
}