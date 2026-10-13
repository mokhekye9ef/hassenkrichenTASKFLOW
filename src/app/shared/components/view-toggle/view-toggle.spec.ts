import { TestBed } from '@angular/core/testing';
import { ViewToggle } from './view-toggle';

describe('ViewToggle', () => {
  it('should highlight the active button and switch view on click', async () => {
    const fixture = TestBed.createComponent(ViewToggle);
    await fixture.whenStable();
    const [tasksButton, usersButton] = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'button',
    );

    expect(tasksButton.classList).toContain('bg-indigo-600');
    expect(usersButton.classList).not.toContain('bg-indigo-600');

    usersButton.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.view()).toBe('users');
    expect(usersButton.classList).toContain('bg-indigo-600');
    expect(tasksButton.classList).not.toContain('bg-indigo-600');
  });
});
