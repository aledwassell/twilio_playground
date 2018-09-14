import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ServerConnectorService} from '../../_services/server-connector.service';
import {Number} from '../../_interfaces/numbers';

@Component({
    selector: 'app-message',
    template: `
        <div class="container">
            <h1>SEND A MESSAGE TO: {{f.to.value}}</h1>
            <p></p>
            <form [formGroup]="twilioCallForm" (ngSubmit)="makeCall()">
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
    styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

    twilioForm: FormGroup;
    submitted = false;
    numbers: Array<Number> = [
        {id: 1, name: 'Chris', number: '+447483256112'},
        {id: 2, name: 'Aled', number: '+447587188943'}
    ];

    constructor(
        private server: ServerConnectorService,
        private fb: FormBuilder) {
    }
    ngOnInit() {
        this.twilioForm = this.fb.group({
            to: ['', Validators.required],
            msg: ['', Validators.required]
        });
        console.log(this.twilioForm, this.f);
    }
    get f() { return this.twilioForm.controls; }
    public sendMessage = () => {
        this.submitted = true;
        this.server.sendMsg(this.twilioForm.value).subscribe(
            (d) => {
                console.log(d);
                this.twilioForm.reset();
            },
            e => {
                console.log(this.twilioForm.value);
            }
        );
    }
}
