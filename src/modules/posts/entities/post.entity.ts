import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title?: string;

  @Column()
  body?: string;
}
