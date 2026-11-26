import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AccountEntity } from '../entities/account.entity';
import { AccountMemberEntity } from '../entities/account-member.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { AccountMemberGuard } from './account-member.guard';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      AccountMemberEntity,
      ProfileEntity,
    ]),
    AuthModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountMemberGuard],
  exports: [AccountMemberGuard, TypeOrmModule],
})
export class AccountsModule {}
