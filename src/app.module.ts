import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { FarmModule } from './modules/farm/farm.module';
import { AnimalModule } from './modules/animal/animal.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), CategoryModule, FarmModule, AnimalModule],
  controllers: [AppController, AuthController ],
  providers: [PrismaService, AuthService ],
})
export class AppModule {}
