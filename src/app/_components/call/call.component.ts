import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ServerConnectorService} from '../../_services/server-connector.service';
import {Number} from '../../_interfaces/numbers';
import {Call} from '../../_interfaces/call';
import {Color} from '../../_interfaces/color';

@Component({
    selector: 'app-call',
    template: `
        <div>
            <h1>MAKE A PHONE CALL TO: {{f.to.value}}</h1>
            <form [formGroup]="twilioCallForm" (ngSubmit)="makeCall()">
                <div class="input-box">
                    <select type="text" formControlName="to" placeholder="number" required>
                        <option selected value="" disabled>select a number</option>
                        <option *ngFor="let number of numbers" [value]="number.number">{{number.name}}</option>
                    </select>
                </div>
                <p>when writing your message, please use the hash sign ({{option_sign}}) where you want a call option to be placed.</p>
                <div class="input-box">
                    <textarea rows="5" cols="100" type="text" formControlName="sentence" placeholder="message" required></textarea>
                </div>
                <div>
                    <p>please input the three options you chose.</p>
                    <div class="inline-input-boxes">
                        <input type="text" formControlName="item_1" placeholder="option one" required>
                    </div>
                    <div class="inline-input-boxes">
                        <input type="text" formControlName="item_2" placeholder="option two" required>
                    </div>
                    <div class="inline-input-boxes">
                        <input type="text" formControlName="item_3" placeholder="option three" required>
                    </div>
                </div>
                <!--<div>-->
                    <!--<p>please 5 choose possible background colors.</p>-->
                    <!--<div class="inline-input-boxes">-->
                        <!--<select type="text" formControlName="color1" placeholder="color 1" required>-->
                            <!--<option selected value="" disabled>select a color</option>-->
                            <!--<option [value]="color.name" *ngFor="let color of colors">{{color.name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="inline-input-boxes">-->
                        <!--<select type="text" formControlName="color2" placeholder="color 2" required>-->
                            <!--<option selected value="" disabled>select a color</option>-->
                            <!--<option [value]="color.name" *ngFor="let color of colors">{{color.name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="inline-input-boxes">-->
                        <!--<select type="text" formControlName="color3" placeholder="color 3" required>-->
                            <!--<option selected value="" disabled>select a color</option>-->
                            <!--<option [value]="color.name" *ngFor="let color of colors">{{color.name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="inline-input-boxes">-->
                        <!--<select type="text" formControlName="color4" placeholder="color 4" required>-->
                            <!--<option selected value="" disabled>select a color</option>-->
                            <!--<option [value]="color.name" *ngFor="let color of colors">{{color.name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="inline-input-boxes">-->
                        <!--<select type="text" formControlName="color5" placeholder="color 5" required>-->
                            <!--<option selected value="" disabled>select a color</option>-->
                            <!--<option [value]="color.name" *ngFor="let color of colors">{{color.name}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                <!--</div>-->
                <button class="btn" type="submit" [disabled]="!twilioCallForm.valid" [ngClass]="{'disabled' : !twilioCallForm.valid}">MAKE CALL</button>
            </form>
        </div>
    `,
    styleUrls: ['./call.component.sass']
})
export class CallComponent implements OnInit {
    public option_sign: string = '#';
    twilioCallForm: FormGroup;
    public numbers: Array<Number>;
    public colors: Array<Color>;
    get f() { return this.twilioCallForm.controls; }
    constructor(private server: ServerConnectorService, private fb: FormBuilder) {
        this.numbers = this.server.getNumbers;
        this.colors = this.server.getColors;
    }
    ngOnInit() {
        this.twilioCallForm = this.fb.group({
            to: ['', Validators.required],
            sentence: ['', Validators.required],
            item_1: ['', Validators.required],
            item_2: ['', Validators.required],
            item_3: ['', Validators.required]
            // color1: ['', Validators.required],
            // color2: ['', Validators.required],
            // color3: ['', Validators.required],
            // color4: ['', Validators.required],
            // color5: ['', Validators.required]
        });
    }
    public makeCall = () => {
        this.server.makeCall(this.twilioCallForm.value).subscribe(
            (d) => {
                this.twilioCallForm.reset();
            },
            e => {
                console.log(this.twilioCallForm.value);
            }
        );
    };

}
