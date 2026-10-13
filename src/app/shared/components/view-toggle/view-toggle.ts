import { Component, model } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  view = model<ViewMode>('tasks');

  protected readonly options: { value: ViewMode; label: string }[] = [
    { value: 'tasks', label: 'Par tâche' },
    { value: 'users', label: 'Par user' },
  ];

  select(view: ViewMode): void {
    this.view.set(view);
  }
}
