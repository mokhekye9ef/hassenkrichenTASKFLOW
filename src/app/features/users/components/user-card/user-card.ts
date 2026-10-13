import { Component, computed, input } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  initials = computed(() =>
    this.user()
      .name.split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join(''),
  );

  assignedTasks = computed(() =>
    this.projects()
      .flatMap((project) => project.tasks)
      .filter((task) => task.assigneeId === this.user().id),
  );

  userProjects = computed(() =>
    this.projects().filter((project) =>
      project.tasks.some((task) => task.assigneeId === this.user().id),
    ),
  );

  counters = computed(() => {
    const tasks = this.assignedTasks();
    return [
      {
        label: 'À faire',
        count: tasks.filter((task) => task.status === 'En attente').length,
        classes: 'bg-amber-50 text-amber-800',
      },
      {
        label: 'En cours',
        count: tasks.filter((task) => task.status === 'En cours').length,
        classes: 'bg-blue-50 text-blue-800',
      },
      {
        label: 'Terminées',
        count: tasks.filter((task) => task.status === 'Terminé').length,
        classes: 'bg-green-50 text-green-800',
      },
    ];
  });
}
