import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "role", schema: "public" })
@Unique(["uid", "type"])
@Index("idx_role_uid", ["uid"])
@Index("idx_role_type", ["type"])
export class Role {
  @PrimaryGeneratedColumn("identity")
  id!: number;

  @Column("text")
  uid!: string;

  @Column("text")
  type!: string;

  @Column("text", { nullable: true })
  comment: string | null = null;
}
