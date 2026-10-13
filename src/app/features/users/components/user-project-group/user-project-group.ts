import { Component, computed, input } from '@angular/core';
import { TaskList } from '../../../projects/components/task-list/task-list';
import { Project } from '../../../projects/models/project.model';

@Component({
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  project = input.required<Project>();
  userId = input.required<number>();

  tasks = computed(() => this.project().tasks.filter((task) => task.assigneeId === this.userId()));
}
