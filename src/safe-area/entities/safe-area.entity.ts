import { Device } from "src/device/entities/device.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SafeArea {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {eager: true})
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: User;

  @Column()
  name: string;

  @Column()
  is_working: boolean;

  @OneToMany(() => Device, (device) => device.id)
  devices: Device[];
}
