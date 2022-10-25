import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { HeaderComponent } from './core/header/header.component';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { BoardModule } from './features/board/board.module';
import { SharedModule } from './shared/shared.module';
import { BoardStore } from './features/board/services/board.store';
import { HomeComponent } from './features/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    DashboardModule,
    BoardModule,
    SharedModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    BoardStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
