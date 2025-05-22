// src/entities/Request.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.requests, { onDelete: 'CASCADE' })
    user!: User;

    @ManyToOne(() => Software, software => software.requests, { onDelete: 'CASCADE' })
    software!: Software;

    @Column({
        type: "enum",
        enum: ["Read", "Write", "Admin"]
    })
    accessType!: string;

    @Column('text')
    reason!: string;

    @Column({
        type: "enum",
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    })
    status!: string;
}