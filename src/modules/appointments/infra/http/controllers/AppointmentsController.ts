import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointsmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id: providerId, datetime } = request.body;

      const parsedDate = parseISO(datetime);

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        providerId,
        datetime: parsedDate,
      });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
