import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { AuthenticatedRequest } from '../auth/supabase-auth.guard';
import {
  AccountMemberEntity,
  MemberRole,
} from '../entities/account-member.entity';
import { ROLES_KEY } from './roles.decorator';

interface AccountScopedRequest extends AuthenticatedRequest {
  params: { accountId?: string };
  headers: AuthenticatedRequest['headers'] & { 'x-account-id'?: string };
  accountMember?: AccountMemberEntity;
}

@Injectable()
export class AccountMemberGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(AccountMemberEntity)
    private readonly memberRepo: Repository<AccountMemberEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AccountScopedRequest>();
    const accountId =
      request.params.accountId ?? request.headers['x-account-id'];
    if (!accountId) {
      throw new BadRequestException('accountId requerido');
    }

    const member = await this.memberRepo.findOne({
      where: { accountId, userId: request.user.id },
    });
    if (!member) {
      throw new ForbiddenException('No eres miembro de esta cuenta');
    }

    const requiredRoles = this.reflector.getAllAndOverride<
      MemberRole[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (requiredRoles?.length && !requiredRoles.includes(member.role)) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    request.accountMember = member;
    return true;
  }
}
