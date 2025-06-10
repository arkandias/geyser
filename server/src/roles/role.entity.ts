import { Column, Entity, Index, PrimaryColumn, Unique } from "typeorm";

@Entity({ name: "teacher_role", schema: "public" })
@Unique(["oid", "teacher_id", "role"])
@Index("idx_teacher_role_oid", ["oid"])
@Index("idx_teacher_role_role", ["role"])
@Index("idx_teacher_role_oid_teacher_id", ["oid", "teacher_id"])
export class Role {
  @PrimaryColumn("integer")
  oid!: number;

  @PrimaryColumn("integer", { generated: "identity" })
  id!: number;

  @Column("integer")
  teacher_id!: number;

  @Column("text")
  role!: string;

  @Column("text", { nullable: true })
  comment: string | null = null;
}
