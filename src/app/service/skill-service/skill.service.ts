import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../dto/skill/skill';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/skills/${id}`);
  }

  saveSkill(skill: Skill): Observable<Skill> {
    return skill.id
      ? this.http.put<Skill>(`${this.apiUrl}/skills/${skill.id}`, skill)
      : this.http.post<Skill>(`${this.apiUrl}/skills`, skill);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/skills/${id}`);
  }

  getProficiencies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/enums/proficiencies`);
  }

  getSkillCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/enums/skill-categories`);
  }

  getSkillActions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/enums/skill-actions`);
  }
}

