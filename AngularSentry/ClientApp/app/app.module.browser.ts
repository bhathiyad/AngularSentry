import * as Raven from 'raven-js'; //Sentry integration
import { NgModule, ErrorHandler } from '@angular/core'; //Sentry integration
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';

//Sentry integration
Raven
    .config('___PUBLIC_DSN___')//Create new account in Sentry and get a key for the project
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        Raven.captureException(err);
    }
}

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ErrorHandler, useClass: RavenErrorHandler } //Sentry integration
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
