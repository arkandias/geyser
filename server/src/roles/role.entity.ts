import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role", schema: "public" })
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uid!: string;

  @Column()
  type!: string;
}
