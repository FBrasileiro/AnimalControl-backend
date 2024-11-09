import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FarmService {
  constructor(private prisma: PrismaService){}
  async create(createFarmDto: CreateFarmDto, userId: number) {
    const user = await this.prisma.user.findFirst({where: {id: userId}})
    if(!user) {
      throw new HttpException("User error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const farm = await this.prisma.farm.create({
      data:{
        name: createFarmDto.name,
        description: createFarmDto.description,
        owner_id: userId
      }
    })

    return {"message": "Farm Created", "farm":farm}
  }

  async findAll(userId: number) {
    const user = await this.prisma.user.findFirst({where: {id: userId}})
    if(!user) {
      throw new HttpException("User error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const farms = await this.prisma.farm.findMany({where: {owner_id: userId}})
    return farms
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
