import CollectPoint from '@modules/collect-points/infra/typeorm/entities/CollectPoint';
import Recycler from '@modules/recyclers/infra/typeorm/entities/Recycler';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('recyclings')
export default class Recycling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recycler_id: string;

  @Column()
  collect_point_id: string;

  @ManyToOne(() => Recycler)
  @JoinColumn({ name: 'recycler_id' })
  recycler: Recycler;

  @ManyToOne(() => CollectPoint)
  @JoinColumn({ name: 'collect_point_id' })
  collect_point: CollectPoint;

  @Column()
  items: string;

  @Column()
  quantities: string;

  @Column()
  finished: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
