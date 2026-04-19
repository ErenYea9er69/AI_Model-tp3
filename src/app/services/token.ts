import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth";
import { inject } from "@angular/core";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const toExclude = "/login";

    // Test if it's the login route, if so, don't add the Authorization header
    if (req.url.search(toExclude) === -1) {
        let jwt = authService.getToken();
        let reqWithToken = req.clone({
            setHeaders: { Authorization: "Bearer " + jwt }
        });
        return next(reqWithToken);
    }
    return next(req);
};
