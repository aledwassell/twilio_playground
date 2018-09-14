import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-call',
    template: `
        <div class="container">
            <h1>SEND A MESSAGE TO: {{f.to.value}}</h1>
            <p></p>
            <form [formGroup]="twilioForm" (ngSubmit)="sendMessage()">
                <div class="input-box">
                    <select type="text" formControlName="to" placeholder="number">
                        <option selected value="" disabled>select a number</option>
                        <option *ngFor="let number of numbers" [value]="number.number">{{number.name}}</option>
                    </select>
                </div>
                <div class="input-box">
                    <textarea cols="200" type="text" formControlName="msg" placeholder="message"></textarea>
                </div>
                <button class="btn" type="submit">SEND MESSAGE</button>
            </form>
        </div>
    `,
    styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public phonecall = () => {
        this.submitted = true;
        this.server.makeCall(this.twilioForm.value).subscribe(
            (d) => {
                console.log(d);
                this.twilioForm.reset();
            },
            e => {
                console.log(this.twilioForm.value);
            }
        );
    };

}
