import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MessageComponent} from './_components/message/message.component';
import { CallComponent } from './_components/call/call.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        CallComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
