import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/common/home/home.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { HeaderComponent } from './component/common/header/header.component';
import { Error404Component } from './component/common/error404/error404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './Interceptor/http-interceptor.interceptor';
import { BooksComponent } from './component/common/books/books.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ErrorComponent } from './component/common/error/error.component';
import { SocketService } from './Service/socket.service';

const config: SocketIoConfig = { url:  'https://read-odyssey.top'
                                  // 'http://localhost:3000'
                                  , options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    Error404Component,
    BooksComponent,
    ErrorComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    SocketIoModule.forRoot(config),

    
   ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, useClass : HttpInterceptorInterceptor, multi : true,
    },
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
