import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    datetime: Date,
    providerId: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.datetime, datetime) &&
        appointment.provider_id === providerId,
    );
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === providerId &&
        getMonth(appointment.datetime) + 1 === month &&
        getYear(appointment.datetime) === year
      );
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === providerId &&
        getDate(appointment.datetime) === day &&
        getMonth(appointment.datetime) + 1 === month &&
        getYear(appointment.datetime) === year
      );
    });
    return appointments;
  }

  public async create({
    user_id,
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      user_id,
      datetime: date,
      provider_id: providerId,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
