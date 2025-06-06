import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "role", schema: "public" })
@Unique(["teacher_id", "type"])
@Index("idx_role_teacher_id", ["teacher_id"])
@Index("idx_role_type", ["type"])
export class Role {
  @PrimaryGeneratedColumn("identity")
  id!: number;

  @Column("text")
  teacher_id!: number;

  @Column("text")
  type!: string;

  @Column("text", { nullable: true })
  comment: string | null = null;
}
