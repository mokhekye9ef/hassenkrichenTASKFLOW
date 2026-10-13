import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { User } from '../../../users/models/user.model';
import { Status, Task, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [EmptyState],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private readonly userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input(true);

  private readonly users = signal<User[]>([]);
  private readonly userNames = computed(
    () => new Map(this.users().map((user) => [user.id, user.name])),
  );

  protected readonly statusBorder: Record<Status, string> = {
    'En attente': 'border-amber-400 bg-amber-50',
    'En cours': 'border-blue-500 bg-blue-50',
    Terminé: 'border-green-500 bg-green-50',
  };

  protected readonly statusText: Record<Status, string> = {
    'En attente': 'text-amber-700',
    'En cours': 'text-blue-700',
    Terminé: 'text-green-700',
  };

  protected readonly priorityBadge: Record<TaskPriority, string> = {
    Haute: 'bg-red-100 text-red-700',
    Moyenne: 'bg-orange-100 text-orange-700',
    Basse: 'bg-gray-100 text-gray-600',
  };

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  assigneeName(task: Task): string | undefined {
    return task.assigneeId === undefined ? undefined : this.userNames().get(task.assigneeId);
  }
}
