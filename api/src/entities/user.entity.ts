import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrowing } from './borrowing.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Unique identifier for the user',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'student123',
    description: 'User ID from RCA MIS system',
  })
  @Column({ unique: true })
  userId!: string;

  @ApiProperty({
    example: 'student@example.com',
    description: 'User email address',
  })
  @Column({ unique: true })
  email!: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @Column()
  name!: string;

  @ApiProperty({
    example: 'STUDENT',
    description: 'Role of the user in the system',
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
  })
  @Column({ enum: ['STUDENT', 'TEACHER', 'ADMIN'] })
  role!: string;

  @ApiProperty({
    type: () => [Borrowing],
    description: 'List of borrowing records for this user',
  })
  @OneToMany(() => Borrowing, (borrowing) => borrowing.user)
  borrowings!: Borrowing[];
}
