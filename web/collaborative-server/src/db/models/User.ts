import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Document } from './Document';
import { DocumentUser } from './DocumentUser';

export class User extends Model {
  public id!: string;
  public email!: string;
  public name!: string;
  public avatar_url?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

User.hasMany(Document, { foreignKey: 'owner_id' });
User.belongsToMany(Document, { through: DocumentUser, as: 'accessibleDocuments' });
