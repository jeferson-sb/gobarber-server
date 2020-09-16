import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointsmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { provider_id: providerId, datetime } = request.body;

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        providerId,
        datetime,
        user_id,
      });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
