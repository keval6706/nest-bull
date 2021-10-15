import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'users',
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'timestamp with time zone',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp with time zone',
    })
    updatedAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            return false;
        }
    }
}