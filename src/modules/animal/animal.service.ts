import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService){}
  async create(createAnimalDto: CreateAnimalDto, userId: number) {
    const {
      name,
      dateOfBirth,
      sex,
      description,
      categoryId,
      fatherId,
      motherId,
      label,
      averageProduction,
      productionName,
      dateOfDeath,
      race,
      color,
    } = createAnimalDto;

    const farm = await this.prisma.farm.findFirst({
      where: {owner_id: userId}
    })
    if (!farm) {
      throw new HttpException("Farm error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const categories = await this.prisma.category.findFirst({where: {farm_id: farm.id, id: categoryId}})
    if (!categories) {
      throw new HttpException("Categories error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const animal = await this.prisma.animal.create({
      data: {
        name,
        date_of_birth: new Date(dateOfBirth),
        sex,
        description,
        category: { connect: { id: categoryId } },
        father: fatherId ? { connect: { id: fatherId } } : undefined,
        mother: motherId ? { connect: { id: motherId } } : undefined,
        label,
        average_production: averageProduction,
        production_name: productionName,
        date_of_death: dateOfDeath ? new Date(dateOfDeath) : undefined,
        race,
        color,
      },
    })
    if(animal) {
      if(animal.sex.toLowerCase() == "female")
        await this.prisma.category.update({where: {id: categories.id}, data: {
          females: categories.females+1
        }})
      else if(animal.sex.toLowerCase() == "male")
        await this.prisma.category.update({where: {id: categories.id}, data: {
          males: categories.males+1
        }})
      else {
        throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return animal
    }
    throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async findAll(categoryId: string, userId: string) {
    const farm = await this.prisma.farm.findFirst({
      where: {owner_id: parseInt(userId)}
    })
    if (!farm) {
      throw new HttpException("Farm error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const categories = await this.prisma.category.findFirst({where: {farm_id: farm.id, id: parseInt(categoryId)}})
    if (!categories) {
      throw new HttpException("Categories error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    let animals = this.prisma.animal.findMany({where: { category_id: parseInt(categoryId) }})

    if(animals) return animals

    throw new HttpException("Animals error", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async findQuery(userId, categoryId, name, label) {
    const farm = await this.prisma.farm.findFirst({
      where: {owner_id: parseInt(userId)}
    })
    if (!farm) {
      throw new HttpException("Farm error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const categories = await this.prisma.category.findFirst({where: {farm_id: farm.id, id: parseInt(categoryId)}})
    if (!categories) {
      throw new HttpException("Categories error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    let animals = this.prisma.animal.findMany({where: { category_id: parseInt(categoryId), name: {contains: name}, label: {contains: label} }})

    if(animals) return animals

    throw new HttpException("Animals error", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
