import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';
import { Block } from './Block';
import { DocumentUser } from './DocumentUser';
import { User } from './User';

export class Document extends Model {
  public id!: string;
  public title!: string;
  public ydoc_state!: Buffer;
  public version!: number;
  public owner_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
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
    ydoc_state: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    underscored: true,
    version: true,
  },
);

Document.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });
Document.hasMany(Block, { foreignKey: 'document_id' });
Document.belongsToMany(User, { through: DocumentUser, as: 'users' });
