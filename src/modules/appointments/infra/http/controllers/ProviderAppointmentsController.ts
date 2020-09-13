import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const providerId = request.user.id;
      const { day, month, year } = request.query;

      const listProviderAppointments = container.resolve(
        ListProviderAppointmentsService,
      );

      const appointments = await listProviderAppointments.execute({
        providerId,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      });

      return response.json(classToClass(appointments));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
