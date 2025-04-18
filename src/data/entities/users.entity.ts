import { UserRoleEnum } from 'src/enums/user-role.enum';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    cpf: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, default: null })
    profilePictureUrl: string;

    @Column({ type: 'varchar', default: UserRoleEnum.USER })
    role: UserRoleEnum;

    @Column({ default: false })
    emailConfirmed: boolean;

    @Column({ nullable: true })
    confirmationToken: string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    // Timestamps
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
