import { TestBed } from '@angular/core/testing';
import { PROJECTS } from '../../../projects/data/projects.data';
import { USERS } from '../../data/users.data';
import { User } from '../../models/user.model';
import { UserCard } from './user-card';

describe('UserCard', () => {
  async function render(user: User): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(UserCard);
    fixture.componentRef.setInput('user', user);
    fixture.componentRef.setInput('projects', PROJECTS);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should count tasks by status and group them by project', async () => {
    const element = await render(USERS[0]);
    const counters = [...element.querySelectorAll('.grid > div')].map((el) =>
      [...el.querySelectorAll('p')].map((p) => p.textContent?.trim()).join(' '),
    );

    expect(counters).toEqual(['2 À faire', '1 En cours', '3 Terminées']);
    expect(element.querySelectorAll('app-user-project-group').length).toBe(2);
    expect(element.textContent).not.toContain('Non assignée');
  });

  it('should display an inactive badge', async () => {
    const element = await render(USERS.find((user) => !user.active)!);
    expect(element.textContent).toContain('Inactif');
  });

  it('should display an empty state when no task is assigned', async () => {
    const element = await render(USERS.find((user) => user.name.startsWith('Karim'))!);
    expect(element.querySelector('app-empty-state')?.textContent).toContain(
      'Aucune tâche assignée',
    );
  });
});
