import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

class AirQualityUCI extends Model {}

AirQualityUCI.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    co_gt: { type: DataTypes.FLOAT },
    pt08_s1_co: { type: DataTypes.INTEGER },
    nmhc_gt: { type: DataTypes.INTEGER },
    c6h6_gt: { type: DataTypes.FLOAT },
    pt08_s2_nmhc: { type: DataTypes.INTEGER },
    nox_gt: { type: DataTypes.INTEGER },
    pt08_s3_nox: { type: DataTypes.INTEGER },
    no2_gt: { type: DataTypes.INTEGER },
    pt08_s4_no2: { type: DataTypes.INTEGER },
    pt08_s5_o3: { type: DataTypes.INTEGER },
    temperature: { type: DataTypes.FLOAT },
    humidity: { type: DataTypes.FLOAT },
    absolute_humidity: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: 'AirQualityUCI',
    tableName: 'air_quality_uci',
    timestamps: false,
  },
);

export default AirQualityUCI;
