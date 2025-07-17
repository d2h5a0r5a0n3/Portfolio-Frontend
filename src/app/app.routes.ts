import { Routes } from '@angular/router';
import { adminGuard } from './auth/admin.guard';
import { HomeComponent } from './homea/home/home.component';
import { ProjectComponent } from './projects/project/project.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { ExperienceComponent } from './experiences/experience/experience.component';
import { NewExperienceComponent } from './experiences/new-experience/new-experience.component';
import { EditExperienceComponent } from './experiences/edit-experience/edit-experience.component';
import { ViewExperienceComponent } from './experiences/view-experience/view-experience.component';
import { ContactComponent } from './contact/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: 'logout', component: HomeComponent },
    { path: 'status', component: HomeComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'new-project', component: NewProjectComponent, canActivate: [adminGuard] },
    { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [adminGuard] },
    { path: 'view-project/:id', component: ViewProjectComponent },
    { path: 'experiences', component: ExperienceComponent },
    { path: 'new-experience', component: NewExperienceComponent, canActivate: [adminGuard] },
    { path: 'edit-experience/:id', component: EditExperienceComponent, canActivate: [adminGuard] },
    { path: 'view-experience/:id', component: ViewExperienceComponent },
    { path: 'contact', component: ContactComponent }
];

