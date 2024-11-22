import { Controller, Get, Post, Query, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto, @Request() req) {
    let userId = req.user.id
    return this.animalService.create(createAnimalDto, userId);
  }

  @Get(':categoryId')
  findAll(@Param('categoryId') categoryId, @Request() req) {
    let userId = req.user.id
    return this.animalService.findAll(categoryId, userId);
  }

  @Get(':categoryId/query')
  findQuery(
    @Param('categoryId') categoryId: string,
    @Query() query: { name?: string; label?: string },
    @Request() req,
  ) {
    const userId = req.user.id;
    const { name, label } = query;
    return this.animalService.findQuery(userId, categoryId, name, label);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }
}
