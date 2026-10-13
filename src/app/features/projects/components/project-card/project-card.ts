import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { Status } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [TaskList],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  selected = input(false);
  projectSelected = output<Project>();

  protected readonly statusBadge: Record<Status, string> = {
    'En attente': 'bg-amber-100 text-amber-800',
    'En cours': 'bg-blue-100 text-blue-800',
    Terminé: 'bg-green-100 text-green-800',
  };

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
