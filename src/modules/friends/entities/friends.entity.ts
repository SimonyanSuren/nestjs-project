import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import{Users} from "../../users/entities/users.entity"

@Table
export class Friends extends Model<Friends> {
	toJSON() {
		return {
		  ...this.get(),
		  password: undefined,
		  role: undefined,
		};
	 }
  
	@ForeignKey(() => Users)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
		
    })
    userId: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
		  references: {
			model: "Users", 
			key: 'id',
		}
    })
    friendId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
		  defaultValue:false
    })
    status: boolean;

	 
	 @BelongsTo(() => Users)
	 user: Users


}