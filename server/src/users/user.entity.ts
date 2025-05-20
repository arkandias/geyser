import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "teacher", schema: "public" })
export class User {
  @PrimaryColumn()
  uid!: string;

  @Column()
  displayname!: string;

  @Column()
  active!: boolean;
}
