import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tests')
export class Tests {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    cpf: string;
}
