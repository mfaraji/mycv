import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    OneToMany,
} from 'typeorm';

import { Report } from '../reports/report.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with this id', this.id);
    }
}
