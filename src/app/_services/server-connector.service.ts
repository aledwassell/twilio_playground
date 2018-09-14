import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Message} from '../_interfaces/message';
import {Number} from '../_interfaces/numbers';

@Injectable({
    providedIn: 'root'
})
export class ServerConnectorService {

    urlMsg: string;
    urlCall: string;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.urlMsg = 'http://localhost:4000/sendmsg';
        this.urlCall = 'http://localhost:4000/makecall';
    }

    public sendMsg(msg: Message): Observable<Message> {
        return this.http.post<Message>(this.urlMsg, msg)
            .pipe(
                tap(_ => console.log('data sent')),
                catchError(this.handleError<any>('Adding Data'))
            );
    }

    public makeCall(msg: Message): Observable<Message> {
        return this.http.post<Message>(this.urlCall, msg)
            .pipe(
                tap(_ => console.log('data sent')),
                catchError(this.handleError<any>('Adding Data'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
