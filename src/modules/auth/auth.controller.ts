import { Post, Body, HttpCode } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('login')
  async signIn(@Body() data: SignInDto){
    return await this.authService.signIn(data.email, data.password)
  }

}
