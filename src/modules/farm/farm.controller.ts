import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  create(@Body() createFarmDto: CreateFarmDto, @Request() req) {
    let userId = req.user.id
    return this.farmService.create(createFarmDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    let userId = req.user.id
    return this.farmService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }
}
