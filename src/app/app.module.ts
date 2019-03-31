import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Host } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';

import { CalendarComponent} from './components/calendar-component/calendar.component';
import { HoverEffectOnDaysDirective} from './components/calendar-component/directive/hover-effect-on-days.directive';
import { LoadingSpinnerComponent } from './components/calendar-component/loading-spinner.component/loading-spinner.component';
import { FormsModule } from '@angular/forms';

// import { LocalePipe } from './_pipes/locale.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HoverEffectOnDaysDirective,
    LoadingSpinnerComponent
    // LocalePipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
