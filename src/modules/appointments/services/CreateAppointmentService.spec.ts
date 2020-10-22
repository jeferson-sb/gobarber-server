import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      datetime: new Date(2020, 8, 10, 13),
      user_id: 'user-id',
      providerId: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2020, 8, 31, 11);

    await createAppointment.execute({
      datetime: appointmentDate,
      user_id: '123456',
      providerId: '123123123',
    });

    await expect(
      createAppointment.execute({
        datetime: appointmentDate,
        user_id: '123456',
        providerId: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        datetime: new Date(2020, 8, 10, 11),
        user_id: '123123',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        datetime: new Date(2020, 8, 10, 13),
        user_id: '333444',
        providerId: '333444',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment out of available time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        datetime: new Date(2020, 8, 11, 7),
        user_id: '333444',
        providerId: '333444',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        datetime: new Date(2020, 8, 11, 18),
        user_id: '333444',
        providerId: '333444',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
