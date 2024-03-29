import { Device } from "src/device/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @Column()
  date: Date;

  @Column()
  type: string;

  @ManyToOne(() => Device, {eager: true})
  @JoinColumn({ name: 'device_id', referencedColumnName: 'id' })
  device: Device;
}
