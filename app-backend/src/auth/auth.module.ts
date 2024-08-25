import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { RolesGuard } from './roles/role.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Use ConfigService to get the secret
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
