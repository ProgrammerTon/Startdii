import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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

  async login(user: any) {
    // console.log('At User : ', user);
    // console.log(user);
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
