import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SafeArea } from "src/safe-area/entities/safe-area.entity";

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SafeArea, {eager: true})
  @JoinColumn({ name: 'area_id', referencedColumnName: 'id' })
  area: SafeArea;

  @Column()
  status: string;

  @Column('timestamp')
  date: Date;

  @Column()
  model: string;

  @Column()
  location: string;
}
