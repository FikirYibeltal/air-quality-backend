import { Response } from 'express';
import { parse } from 'csv-parse';
import fs from 'fs';
import { Transform } from 'stream';
import AirQualityUCI from '../../utls/database/models/airQualityUCI';

const BATCH_SIZE = 1000;

export function ingestDataController(req: any, res: Response): any {
  let filePath = '';
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    filePath = req.file.path;
    let batch: any[] = [];

    const transform = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const row = chunk;
        if (row[0] && row[1]) {
          const cleanedRow = {
            date: row[0].split('/').reverse().join('-'),
            time: row[1].replace(/\./g, ':'),
            co_gt: parseFloat(row[2].replace(',', '.')),
            pt08_s1_co: parseInt(row[3], 10),
            nmhc_gt: parseInt(row[4], 10),
            c6h6_gt: parseFloat(row[5].replace(',', '.')),
            pt08_s2_nmhc: parseInt(row[6], 10),
            nox_gt: parseInt(row[7], 10),
            pt08_s3_nox: parseInt(row[8], 10),
            no2_gt: parseInt(row[9], 10),
            pt08_s4_no2: parseInt(row[10], 10),
            pt08_s5_o3: parseInt(row[11], 10),
            temperature: parseFloat(row[12].replace(',', '.')),
            humidity: parseFloat(row[13].replace(',', '.')),
            absolute_humidity: parseFloat(row[14].replace(',', '.')),
          };
          this.push(cleanedRow);
        }
        callback();
      },
    });

    const saveBatch = async () => {
      if (batch.length > 0) {
        await AirQualityUCI.bulkCreate(batch);
        batch = [];
      }
    };

    const stream = fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ';', from_line: 2 } as any))
      .pipe(transform);

    stream.on('data', async (data) => {
      batch.push(data);
      if (batch.length >= BATCH_SIZE) {
        stream.pause();
        try {
          await saveBatch();
          console.log('batch saved');
          stream.resume();
        } catch (err: any) {
          stream.destroy(err);
        }
      }
    });

    stream.on('end', async () => {
      try {
        await saveBatch();
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'Data successfully ingested!' });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    stream.on('error', (err) => {
      if (filePath) fs.unlinkSync(filePath);
      res.status(500).json({ error: err.message });
    });
  } catch (err: any) {
    if (filePath) fs.unlinkSync(filePath);
    res.status(500).json({ error: err.message });
  }
}
