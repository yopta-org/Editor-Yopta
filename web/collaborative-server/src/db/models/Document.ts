import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';
import { Block } from './Block';

export class Document extends Model {
  public id!: string;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Document.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    deletedAt: false,
  },
);

Document.hasMany(Block, { foreignKey: 'document_id' });
