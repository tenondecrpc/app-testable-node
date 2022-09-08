import { describe, expect, it} from 'vitest';
import { Appointment } from '../entities/appointment';
import { CreateAppointment } from './create-appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    });

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).rejects.toBeInstanceOf(Error);
  });
})