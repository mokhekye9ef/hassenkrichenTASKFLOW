import { TestBed } from '@angular/core/testing';
import { PROJECTS } from '../../data/projects.data';
import { TaskList } from './task-list';

describe('TaskList', () => {
  it('should display the assignee name, or "Non assignée"', async () => {
    const fixture = TestBed.createComponent(TaskList);
    fixture.componentRef.setInput('tasks', PROJECTS[1].tasks);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).toContain('Amira Ben Salah');
    expect(text).toContain('Youssef Trabelsi');
    expect(text).toContain('Non assignée');
  });

  it('should hide the assignee when showAssignee is false', async () => {
    const fixture = TestBed.createComponent(TaskList);
    fixture.componentRef.setInput('tasks', PROJECTS[1].tasks);
    fixture.componentRef.setInput('showAssignee', false);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).not.toContain('Amira Ben Salah');
    expect(text).not.toContain('Non assignée');
  });
});
