import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {LoaderService} from "../services/loader/loader-service";
import {inject} from "@angular/core";


export const loaderInterceptorService: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(LoaderService)

    spinnerService.showSpinner();

    return next(req).pipe(
        finalize(() => {
                spinnerService.hideSpinner();
        })
    );
}