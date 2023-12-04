import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: UserDto) {
    const { username, id } = user;
    return {
      token: this.jwtService.sign({ username, id }),
    };
  }
}