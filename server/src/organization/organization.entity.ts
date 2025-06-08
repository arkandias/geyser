import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "organization", schema: "public" })
@Unique(["key"])
export class Organization {
  @PrimaryGeneratedColumn("identity")
  id!: number;

  @Column("text")
  key!: string;

  @Column("text")
  label!: string;

  @Column("text")
  sublabel: string | null = null;
}
