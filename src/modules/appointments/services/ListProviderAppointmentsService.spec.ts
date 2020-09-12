import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list appointments on a specific day', async () => {
    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 20, 14, 0, 0),
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: 'provider',
      year: 2020,
      month: 8,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
