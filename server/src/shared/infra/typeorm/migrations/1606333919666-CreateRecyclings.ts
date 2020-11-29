import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRecyclings1606333919666
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recyclings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'recycler_id',
            type: 'uuid'
          },
          {
            name: 'collect_point_id',
            type: 'uuid'
          },
          {
            name: 'items',
            type: 'varchar'
          },
          {
            name: 'quantities',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'finished',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'RecyclingRecycler',
            referencedTableName: 'recyclers',
            referencedColumnNames: ['id'],
            columnNames: ['recycler_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            name: 'RecyclingCollectPoint',
            referencedTableName: 'collect_points',
            referencedColumnNames: ['id'],
            columnNames: ['collect_point_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recyclings');
  }
}
