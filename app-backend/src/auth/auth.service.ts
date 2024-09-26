import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const data = {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        roles: user.roles,
      };
      return data;
    }
    return null;
  }

  async userForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new NotFoundException('Cant Find User');
    }
    const code = crypto.randomBytes(4).toString('hex');
    console.log(code);
    return null;
  }

  async validCode(email: string, code: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new NotFoundException('Cant Find User');
    }
    if (!user.code) {
      return new UnauthorizedException();
    }
    if (user.code === code) {
      return { message: 'Successful Recovery' };
    }
  }

  async login(user: any) {
    // console.log('At User : ', user);
    // console.log(user);
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
