import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    if(animal) return animal
    throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  findAll() {
    return `This action returns all animal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
