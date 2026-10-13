import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard, EmptyState],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>(PROJECTS);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter((project) => project.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject.set(project);
  }

  sortByName(): void {
    this.projects.update((projects) => [...projects].sort((a, b) => a.name.localeCompare(b.name)));
  }
}
