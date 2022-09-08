export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  
  public get customer() : string {
    return this.props.customer;
  }

  public get startsAt() : Date {
    return this.props.startsAt;
  }
  
  public get endsAt() : Date {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    this.props = props;
  }
}