import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns'

class Appointments extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DataTypes.DATE,
        canceled_at: Sequelize.DataTypes.DATE,
        past: {
          type: Sequelize.DataTypes.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.DataTypes.VIRTUAL,
          get() {
            return isBefore(new Date, subHours(this.date, 2));
          }
        }
      },
      {
        sequelize,
      }
    )

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' })
  }
}

export default Appointments;