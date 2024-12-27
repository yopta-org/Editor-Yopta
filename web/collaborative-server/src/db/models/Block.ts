// src/db/models/Block.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Document } from './Document';
import { User } from './User';

export class Block extends Model {
  public id!: string;
  public document_id!: string;
  public value!: any;
  public meta!: any;
  public type!: string;
  public position!: number;
  public parent_id?: string;
  public created_by!: string;
  public last_modified_by!: string;
  public version!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Block.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document_id: {
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
    meta: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.UUID,
      references: {
        model: 'blocks',
        key: 'id',
      },
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    last_modified_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'blocks',
    timestamps: true,
    underscored: true,
    version: true,
  },
);

Block.belongsTo(Document, { foreignKey: 'document_id' });
Block.belongsTo(Block, { as: 'parent', foreignKey: 'parent_id' });
Block.hasMany(Block, { as: 'children', foreignKey: 'parent_id' });
Block.belongsTo(User, { as: 'creator', foreignKey: 'created_by' });
Block.belongsTo(User, { as: 'lastModifier', foreignKey: 'last_modified_by' });
