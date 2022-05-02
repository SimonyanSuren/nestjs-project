import {
  ForbiddenException,
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/entities/users.entity';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { AuthLoginDto } from './dto/authLogin.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthRegisterDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new ForbiddenException('Email already exist.');
    }

    const salt = await bcrypt.genSalt(10);
    dto.password = await bcrypt.hash(dto.password, salt);
    const user = await this.userRepository.create(dto);
    const { id, name, email } = user;

    return this.signToken({ id, name, email });
  }

  async login(dto: AuthLoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const checkPassword = await bcrypt.compare(dto.password, user.password);

    if (!checkPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { id, name, email } = user;

    return this.signToken({ id, name, email });
  }

  async signToken(payload) {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { user: payload, token };
  }
}
