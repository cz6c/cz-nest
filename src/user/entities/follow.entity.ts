import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { MapEntity } from '@/modules/map/entities/map.entity';
import { MemorialDayEntity } from '@/modules/memorial_day/entities/memorial_day.entity';
import { UserEntity } from './user.entity';
import { QINIU } from '#/index';

@Entity('follow')
export class FollowEntity extends CommonEntity {
  @Column({
    nullable: true,
    transformer: {
      to(value) {
        return value.replace(QINIU.DOMAIN, '');
      },
      from(value) {
        return `${QINIU.DOMAIN}${value}`;
      },
    },
  })
  homeUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @OneToMany(() => MapEntity, (entity) => entity.follow)
  maps: MapEntity[];

  @OneToMany(() => MemorialDayEntity, (entity) => entity.follow)
  memorialDays: MemorialDayEntity[];

  @OneToMany(() => UserEntity, (entity) => entity.follow)
  users: UserEntity[];
}
