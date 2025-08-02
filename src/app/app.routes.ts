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
import { EducationComponent } from './educations/education/education.component';
import { EditEducationComponent } from './educations/edit-education/edit-education.component';
import { NewEducationComponent } from './educations/new-education/new-education.component';
import { ViewEducationComponent } from './educations/view-education/view-education.component';
import { ResumeDisplayComponent } from './resume/resume-display/resume-display.component';
import { ResumeChooserComponent } from './resume/resume-chooser/resume-chooser.component';
import { SkillCardComponent } from './skills/skill-card/skill-card.component';
import { NewSkillComponent } from './skills/new-skill/new-skill.component';
import { EditSkillComponent } from './skills/edit-skill/edit-skill.component';
import { ViewSkillComponent } from './skills/view-skill/view-skill.component';

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
    { path: 'contact', component: ContactComponent },
    { path: 'educations', component: EducationComponent },
    { path: 'new-education', component: NewEducationComponent, canActivate: [adminGuard] },
    { path: 'edit-education/:id', component: EditEducationComponent, canActivate: [adminGuard] },
    { path: 'view-education/:id', component: ViewEducationComponent },
    { path: 'resume', component: ResumeDisplayComponent },
    { path: 'choose-resume', component: ResumeChooserComponent, canActivate: [adminGuard] },
    { path: 'skills', component: SkillCardComponent },
    { path: 'new-skill', component: NewSkillComponent, canActivate: [adminGuard] },
    { path: 'edit-skill/:id', component: EditSkillComponent, canActivate: [adminGuard] },
    { path: 'view-skill/:id', component: ViewSkillComponent }
];

