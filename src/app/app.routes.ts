import { Routes } from '@angular/router';
import { HomeComponent } from './Compoenents/home/home.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { BlogsComponent } from './Compoenents/blogs/blogs.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { MasterComponent } from './master/master.component';

export const routes: Routes = [

    { path: "", pathMatch: "full", redirectTo: "home" },
 

    {
      path: '',
      component: MasterComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'blogs', component: BlogsComponent  },
        { path: 'projects', component: ProjectsComponent },
        { path: 'aboutme', component: AboutMeComponent }

      ]
    },

];
