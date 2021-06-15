import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1611765824842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table dealer (
        id uuid not null,
        agency_id varchar(50) not null,
        email varchar(320) not null,
          
        primary key (id),
        unique (email)
      );

      create table dealer_address (
        id uuid  not null,
        dealer_id uuid not null,
        country char(2) not null,
        city varchar(50) not null,
        postal_code varchar(10) not null,
        street varchar(255) not null,
        street_number varchar(255) not null,
        
        primary key (id),
        constraint fk_dealer_address_dealer
            foreign key (dealer_id)
                references dealer (id);
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table dealer_address;
      drop table dealer;
    `);
  }
}
