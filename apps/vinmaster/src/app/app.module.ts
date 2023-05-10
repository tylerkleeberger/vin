import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CarMDModule } from '~vm/domains/carmd';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { reducer } from './store/app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: false,
      name: 'VIN Master'
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    CarMDModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
