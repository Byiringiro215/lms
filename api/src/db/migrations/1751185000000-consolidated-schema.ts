import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConsolidatedSchema1751185000000 implements MigrationInterface {
  name = 'ConsolidatedSchema1751185000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user table
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

    // Create book table
    await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "isbn" character varying NOT NULL,
                "description" character varying,
                "publishedYear" integer,
                "totalCopies" integer NOT NULL,
                "availableCopies" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "category" character varying NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"),
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);

    // Create borrowing table
    await queryRunner.query(`
            CREATE TABLE "borrowing" (
                "id" SERIAL NOT NULL,
                "borrowDate" TIMESTAMP NOT NULL DEFAULT now(),
                "dueDate" TIMESTAMP NOT NULL,
                "returnDate" TIMESTAMP,
                "status" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_b3c0c75c4a8a5de9c9c0e4a0b7c" PRIMARY KEY ("id")
            )
        `);

    // Add foreign key constraints
    await queryRunner.query(`
            ALTER TABLE "borrowing" 
            ADD CONSTRAINT "FK_3d4cfa8d9b3c3f07e7323754bbd" 
            FOREIGN KEY ("userId") REFERENCES "user"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

    await queryRunner.query(`
            ALTER TABLE "borrowing" 
            ADD CONSTRAINT "FK_bb3e03eec0ad0f29b3be578d8a5" 
            FOREIGN KEY ("bookId") REFERENCES "book"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    await queryRunner.query(
      `ALTER TABLE "borrowing" DROP CONSTRAINT "FK_bb3e03eec0ad0f29b3be578d8a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrowing" DROP CONSTRAINT "FK_3d4cfa8d9b3c3f07e7323754bbd"`,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE "borrowing"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
