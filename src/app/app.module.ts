import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JoditAngularModule } from 'jodit-angular';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { DatePipe } from './home/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    HeaderComponent,
    PostEditComponent,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JoditAngularModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
