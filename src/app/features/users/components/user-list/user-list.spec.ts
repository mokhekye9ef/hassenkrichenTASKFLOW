import { TestBed } from '@angular/core/testing';
import { UserList } from './user-list';

describe('UserList', () => {
  it('should display one card per user', async () => {
    const fixture = TestBed.createComponent(UserList);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-user-card').length).toBe(4);
  });

  it('should filter users and show an empty state when nothing matches', async () => {
    const fixture = TestBed.createComponent(UserList);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    fixture.componentInstance.searchTerm.set('testeur');
    await fixture.whenStable();
    expect(element.querySelectorAll('app-user-card').length).toBe(1);

    fixture.componentInstance.searchTerm.set('inconnu');
    await fixture.whenStable();
    expect(element.querySelector('app-user-card')).toBeNull();
    expect(element.querySelector('app-empty-state')?.textContent).toContain(
      'Aucun utilisateur ne correspond à la recherche.',
    );
  });
});
