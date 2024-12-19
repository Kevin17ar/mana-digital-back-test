import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', type: 'varchar', unique: true, length: 150 })
    title: string;

    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ name: 'stock', type: 'int', default: 0 })
    stock: number;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ name: 'category', type: 'varchar', length: 50 })
    category: string;

    @Column({ name: 'image', type: 'varchar' })
    image: string;

    @Column({ name: 'rate', type: 'decimal', precision: 2, scale: 1, default: 0.0 })
    rate: number;

    @Column({ name: 'count', type: 'int', default: 0 })
    count: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp', nullable: false })
    updatedAt: Date;
}
