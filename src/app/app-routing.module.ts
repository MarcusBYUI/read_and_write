import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'post',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'new', component: PostEditComponent },
      { path: ':id', component: PostComponent },
      { path: ':id/edit', component: PostEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
