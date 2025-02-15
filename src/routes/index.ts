import { Router } from 'express';
import multer from 'multer';
import { notFoundController } from '../controller/notfound';
import { healthController } from '../controller/health';
import { ingestDataController } from '../controller/ingestData';
import { searchController } from '../controller/search';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/health', healthController);

router.post('/ingestData', upload.single('file'), ingestDataController);

router.post('/searchData', searchController);

router.use('*', notFoundController);

export default router;
