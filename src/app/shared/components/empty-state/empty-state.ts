import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `<p class="rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
    {{ message() }}
  </p>`,
})
export class EmptyState {
  message = input.required<string>();
}
