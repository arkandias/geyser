import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity({ name: "teacher", schema: "public" })
@Unique(["email"])
@Index("idx_teacher_position_id", ["position_id"])
export class User {
  @PrimaryGeneratedColumn("identity")
  id!: number;

  @PrimaryColumn("text")
  email!: string;

  @Column("text")
  firstname!: string;

  @Column("text")
  lastname!: string;

  @Column("text", { nullable: true })
  alias: string | null = null;

  @Column({ type: "text" })
  displayname!: string;

  @Column("integer", { nullable: true })
  position_id: number | null = null;

  @Column("real", { nullable: true })
  base_service_hours: number | null = null;

  @Column("boolean", { default: true })
  visible!: boolean;

  @Column("boolean", { default: true })
  active!: boolean;
}
