import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Client_Name:string;

  @Column({unique:true})
  Email:string;

  @Column({nullable:true})
  Tag:string;

  @Column({type:'date' ,nullable:true })
  Cut_Off_Date:string

}