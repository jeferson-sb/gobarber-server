import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointment.execute({
      datetime: new Date(),
      providerId: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointmentDate = new Date(2020, 7, 31, 11);

    await createAppointment.execute({
      datetime: appointmentDate,
      providerId: '123123123',
    });

    expect(
      createAppointment.execute({
        datetime: appointmentDate,
        providerId: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
