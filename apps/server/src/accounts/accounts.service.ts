import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import {
  AccountMemberEntity,
  MemberRole,
} from '../entities/account-member.entity';

@Injectable()
export class AccountsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(AccountMemberEntity)
    private readonly memberRepo: Repository<AccountMemberEntity>,
  ) {}

  async findForUser(userId: string) {
    const memberships = await this.memberRepo.find({
      where: { userId },
      relations: { account: true },
      order: { createdAt: 'ASC' },
    });
    return memberships.map((m) => ({
      id: m.account.id,
      name: m.account.name,
      role: m.role,
      createdAt: m.account.createdAt,
    }));
  }

  async create(userId: string, name: string) {
    return this.dataSource.transaction(async (manager) => {
      const account = manager.create(AccountEntity, { name: name.trim() });
      const savedAccount = await manager.save(account);

      const member = manager.create(AccountMemberEntity, {
        accountId: savedAccount.id,
        userId,
        role: MemberRole.OWNER,
      });
      await manager.save(member);

      return {
        id: savedAccount.id,
        name: savedAccount.name,
        role: MemberRole.OWNER,
        createdAt: savedAccount.createdAt,
      };
    });
  }

  async findMembers(accountId: string) {
    const members = await this.memberRepo.find({
      where: { accountId },
      relations: { profile: true },
      order: { createdAt: 'ASC' },
    });
    return members.map((m) => ({
      userId: m.userId,
      role: m.role,
      createdAt: m.createdAt,
      fullName: m.profile.fullName,
      email: m.profile.email,
      avatarUrl: m.profile.avatarUrl,
    }));
  }
}
