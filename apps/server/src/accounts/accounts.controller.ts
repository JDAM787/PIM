import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { CurrentUser } from '../auth/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { MemberRole } from '../entities/account-member.entity';
import { AccountMemberGuard } from './account-member.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './create-account.dto';
import { Roles } from './roles.decorator';

@Controller('accounts')
@UseGuards(SupabaseAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findForUser(@CurrentUser() user: User) {
    return this.accountsService.findForUser(user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(user.id, dto.name);
  }

  @Get(':accountId/members')
  @UseGuards(AccountMemberGuard)
  @Roles(
    MemberRole.OWNER,
    MemberRole.ADMIN,
    MemberRole.EDITOR,
    MemberRole.VIEWER,
  )
  findMembers(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.accountsService.findMembers(accountId);
  }
}
