import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, 
              private config: ConfigService,
              private jwt: JwtService) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })
    if(user){
      if(bcrypt.compare(user.password, password)){
        const {password, ...payload} = user
        return {'token': this.jwt.sign(payload)}
      }
    }else{
      bcrypt.compare(this.config.get<string>('DUMMY_BCRYPT'), "asdfsdf")
      throw new HttpException("Usuário ou senha incorretos", HttpStatus.NOT_FOUND)
    }

  }
}
