import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService){}
  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const farm = await this.prisma.farm.findFirst({
      where: {owner_id: userId}
    })
    if (!farm) {
      throw new HttpException("Farm error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const category = await this.prisma.category.create({
      data:{
        name: createCategoryDto.name,
        farm: {connect:{id: farm.id}},
        males: 0,
        females: 0,
      }
    })
    return category
  }

  async findAll(userId: number) {
    const farm = await this.prisma.farm.findFirst({
      where: {owner_id: userId}
    })
    if (!farm) {
      throw new HttpException("Farm error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const category = await this.prisma.category.findMany({where:{farm_id: farm.id}})
    return category
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
