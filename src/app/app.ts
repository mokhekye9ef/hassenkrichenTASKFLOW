import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewMode, ViewToggle } from './shared/components/view-toggle/view-toggle';

@Component({
  imports: [ProjectList, UserList, ViewToggle],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TaskFlow');
  protected readonly view = signal<ViewMode>('tasks');
}
