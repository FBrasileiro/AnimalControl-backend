import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  async create(data: CreateUserDto) {
    const rounds = 10;
    let pwd = await bcrypt.hash(data.password, rounds)
    data.password = pwd

    const user_exists = await this.prisma.user.findFirst({
      where:{
        email: data.email
      }
    })
    if (user_exists) {
      throw new HttpException('Usuário ja existe', HttpStatus.CONFLICT) // Vulneravel a enumeração de usuários
    }
    const user = await this.prisma.user.create({
      data,
    })
    const {password, ..._user} = user
    return _user
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
