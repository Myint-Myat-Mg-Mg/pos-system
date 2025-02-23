import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService {
  async hash(password: string) {
    return argon.hash(password);
  }

  async verify(hashedPassword: string, plainPassword: string) {
    return argon.verify(hashedPassword, plainPassword);
  }
}
