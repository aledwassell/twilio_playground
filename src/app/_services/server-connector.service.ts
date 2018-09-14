import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Message} from '../_interfaces/message';
import {Number} from '../_interfaces/numbers';
import {Call} from '../_interfaces/call';
import {Color} from '../_interfaces/color';

@Injectable({
    providedIn: 'root'
})
export class ServerConnectorService {
    private _numbers: Array<Number> = [
        {id: 1, name: 'Chris', number: '+447483256112'},
        {id: 2, name: 'Aled', number: '+447587188943'},
        {id: 3, name: 'Rapha', number: '+447961440183'},
        {id: 4, name: 'Bethan', number: '+447961440183'}
    ];
    private _colors: Array<Color> = [
        {name: 'red', hex: 'D13131'},
        {name: 'blue', hex: '2D72CF'},
        {name: 'yellow', hex: 'EAD913'},
        {name: 'pink', hex: 'EC60B9'},
        {name: 'purple', hex: '925DCD'},
        {name: 'orange', hex: 'E68B24'},
        {name: 'green', hex: '38B250'}
    ];
    get getNumbers(): Array<Number> {
        return this._numbers;
    }
    get getColors(): Array<Color> {
        return this._colors;
    }
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

    public makeCall(call: Call): Observable<Message> {
        // let _senetence = call.sentence.replace(/(\r\n\t|\n|\r\t)/gm,' ').split(' ' || '↵');
        // console.log(_senetence);
        // for (let i = 0; i < _senetence.length; i++) {
        //     if (_senetence[i] === '#1') {_senetence[i] = `{{flow.data.item_1}}`}
        //     if (_senetence[i] === '#2') {_senetence[i] = `{{flow.data.item_2}}`}
        //     if (_senetence[i] === '#3') {_senetence[i] = `{{flow.data.item_3}}`}
        // }
        // call.sentence = _senetence.join(' ');
        return this.http.post<Call>(this.urlCall, call)
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
