import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role', schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column({ name: 'type' })
  type: string;
}
