import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { USERS } from '../../features/users/data/users.data';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = TestBed.inject(UserService);
  });

  it('should return all users', async () => {
    expect(await firstValueFrom(service.getUsers())).toEqual(USERS);
  });

  it('should return a user by id', async () => {
    expect((await firstValueFrom(service.getUserById(1)))?.name).toBe('Amira Ben Salah');
  });

  it('should return undefined for an unknown id', async () => {
    expect(await firstValueFrom(service.getUserById(999))).toBeUndefined();
  });
});
