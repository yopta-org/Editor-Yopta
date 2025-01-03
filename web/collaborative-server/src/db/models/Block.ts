import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Document } from './Document';

export class Block extends Model {
  public id!: string;
  public documentId!: string;
  public value!: any; // json []
  public type!: string;
  public meta!: any; // json {}
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Block.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'documents',
        key: 'id',
      },
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: 'blocks',
    timestamps: true,
    deletedAt: false,
  },
);

Block.belongsTo(Document, { foreignKey: 'documentId' });
