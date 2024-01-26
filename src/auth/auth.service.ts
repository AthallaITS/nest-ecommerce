import { USER_SELECT } from './../common/configs/constants/user.constants';
import { SecurityConfig } from './../common/configs/config.interface';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly passwordService: PasswordService,
    private readonly logging: Logger,
  ) {}

  private logger(message: string) {
    this.logging.log(message, AuthService.name);
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );
    const create = {
      ...payload,
      password: hashedPassword,
      email: payload.email.toLowerCase(),
    };

    return this.prisma.user.create({ data: create });
  }

  async login(payload: LoginDto): Promise<TokenDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${payload.email}`);
    }

    const passwordValid = this.passwordService.validatePassword(
      payload.password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({ userId: user.id });
  }

  getUsers() {
    return this.prisma.user.findMany({
      select: USER_SELECT,
    });
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });

    if (!user) {
      throw new NotFoundException(`User with ID(s): ${id} not found`);
    }

    return user;
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  generateTokens(payload: { userId: string }): TokenDto {
    try {
      return {
        accessToken: this.generateAccessToken(payload),
        refreshToken: this.generateRefreshToken(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate token');
    }
  }
  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.expiresIn,
    });
  }
}