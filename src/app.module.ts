import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { FarmModule } from './modules/farm/farm.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), FarmModule],
  controllers: [AppController, AuthController ],
  providers: [PrismaService, AuthService ],
})
export class AppModule {}
