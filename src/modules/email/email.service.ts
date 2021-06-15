import { Email } from '@modules/dealer/domain/value-objects/email.value-object';

export class EmailService {
  async send(email: Email, message: string): Promise<void> {
    // Sending email implementation goes here
  }
}
