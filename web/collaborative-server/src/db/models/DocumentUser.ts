import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';

export class DocumentUser extends Model {
  public document_id!: string;
  public user_id!: string;
  public role!: 'owner' | 'editor' | 'viewer';
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

DocumentUser.init(
  {
    document_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'documents',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM('owner', 'editor', 'viewer'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'document_users',
    timestamps: true,
    underscored: true,
  },
);
