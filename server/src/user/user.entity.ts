import { Column, Entity, Index, PrimaryColumn, Unique } from "typeorm";

@Entity({ name: "teacher", schema: "public" })
@Unique(["oid", "email"])
@Index("idx_teacher_oid", ["oid"])
@Index("idx_teacher_oid_position_id", ["oid", "position_id"])
export class User {
  @PrimaryColumn("integer")
  oid!: number;

  @PrimaryColumn("integer", { generated: "identity" })
  id!: number;

  @Column("text")
  email!: string;

  @Column("text")
  firstname!: string;

  @Column("text")
  lastname!: string;

  @Column("text", { nullable: true })
  alias: string | null = null;

  @Column("text")
  displayname!: string;

  @Column("integer", { nullable: true })
  position_id: number | null = null;

  @Column("real", { nullable: true })
  base_service_hours: number | null = null;

  @Column("boolean", { default: true })
  visible!: boolean;

  @Column("boolean", { default: true })
  active!: boolean;

  @Column("boolean", { default: true })
  access!: boolean;
}
