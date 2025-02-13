import { Request, Response } from 'express';
import AirQualityUCI from '../../utls/database/models/airQualityUCI';
import { Op } from 'sequelize';
import { transformDateFormat } from '../../utls/helpers';

export async function searchController(req: Request, res: Response): Promise<any> {
  try {
    const { startDate, endDate, parameter = 'all' } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    let data: any = [];
    if (parameter !== 'all') {
      data = await AirQualityUCI.findAll({
        attributes: ['date', 'time', parameter as string],
        where: {
          date: {
            [Op.between]: [transformDateFormat(startDate), transformDateFormat(endDate)],
          },
        },
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
        ],
      });
    } else {
      data = await AirQualityUCI.findAll({
        where: {
          date: {
            [Op.between]: [transformDateFormat(startDate), transformDateFormat(endDate)],
          },
        },
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
        ],
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data in date range' });
  }
}
