import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';
import { Document } from './Document';
import { User } from './User';

export class DocumentHistory extends Model {
  public id!: string;
  public document_id!: string;
  public user_id!: string;
  public change_type!: 'create' | 'update' | 'delete';
  public change_data!: any;
  public metadata!: any;
  public readonly timestamp!: Date;
}

DocumentHistory.init(
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    change_type: {
      type: DataTypes.ENUM('create', 'update', 'delete'),
      allowNull: false,
    },
    change_data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'document_history',
    timestamps: false,
  },
);

DocumentHistory.belongsTo(Document, { foreignKey: 'document_id' });
DocumentHistory.belongsTo(User, { foreignKey: 'user_id' });
