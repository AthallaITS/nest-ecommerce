import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { SecurityConfig } from './../common/configs/config.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRounds = securityConfig.bcryptSaltOrRound;
    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }
  constructor(private readonly configService: ConfigService) {}

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string) {
    return hash(password, this.bcryptSaltRounds);
  }
}