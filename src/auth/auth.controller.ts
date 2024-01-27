import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse({ type: CreateUserDto })
  @Post()
  register(@Body() data: CreateUserDto): Promise<User> {
    return this.authService.createUser(data);
  }

  @ApiOperation({ description: 'User authentication' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Get()
  findAllUsers() {
    return this.authService.getUsers();
  }

  @Get('user/:id')
  findUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }
}
