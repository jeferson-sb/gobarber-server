import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Ted Mosby',
      email: 'tedmosby@mosbysdesign.com',
      password: '123456',
    });

    const signedUser = await fakeUsersRepository.create({
      name: 'Jake Josh',
      email: 'jakejosh@mosbysdesign.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: signedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
