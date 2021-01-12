import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/entities/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(userName);

    if (!user) {
      return null;
    }

    const isEqual = await compare(password, user.password);

    if (user && isEqual) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user._doc.userName,
      sub: user._doc._id.toString(),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
