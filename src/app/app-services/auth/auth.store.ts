import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap, shareReplay, pipe } from "rxjs";
import { UserLogin } from '../../models/login.model'
import { HttpClient } from "@angular/common/http";

const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    private userHttp = 'https://stellavibe.onrender.com/users/login';
    private subject = new BehaviorSubject<UserLogin>(null);

    user$: Observable<UserLogin> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>

    constructor(
        private http: HttpClient
    ) {
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }
    }

    login(username: string, password: string): Observable<UserLogin> {
        return this.http.post<UserLogin>(this.userHttp, {username, password})
        .pipe(
            tap(user => {
                this.subject.next(user);
                localStorage.setItem(AUTH_DATA, JSON.stringify(user));
                console.log('FROM AUTH: ' + JSON.stringify(user));

            }),
            shareReplay()
        )
    }
    

    logout() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }

}

