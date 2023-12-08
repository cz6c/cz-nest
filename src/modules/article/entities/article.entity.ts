import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { CategoryEntity } from '@/modules/category/entities/category.entity';
import { TagEntity } from '@/modules/tag/entities/tag.entity';
import { ArticleVO } from '../dto/index.dto';

@Entity('article')
export class ArticleEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  coverUrl: string;

  @Column()
  htmlContent: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn()
  author: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.articles)
  @JoinColumn()
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.articles)
  @JoinTable()
  tags: TagEntity[];

  entityToVo(): ArticleVO {
    const { id, title, coverUrl, htmlContent, tags, createTime, updateTime } =
      this;
    return {
      id,
      title,
      coverUrl,
      htmlContent,
      createTime,
      updateTime,
      tags: tags.filter(({ isDelete }) => !isDelete),
      authorId: this.author?.id ?? 0,
      authorName: (this.author?.nickname || this.author?.username) ?? '',
      categoryId: this.category?.id ?? 0,
      categoryName: this.category?.name ?? '',
    };
  }
}