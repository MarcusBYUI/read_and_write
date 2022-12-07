import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JoditAngularModule } from 'jodit-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { ExcerptPipe } from './home/excerpt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    HeaderComponent,
    PostEditComponent,
    ExcerptPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JoditAngularModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
