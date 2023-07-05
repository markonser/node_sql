import {fileURLToPath} from 'url';
import {dirname} from 'path';
import moment from 'moment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');

  },

  filename: function (req, file, callback) {
    const saveFileName = `${moment().format('DD-MM-YYYY_HHmmss-SSS_') + file.originalname}`;
    req.body.fileName = saveFileName;
    callback(null, saveFileName);

  }
});

const fileFilter = (req, file, callback) => {

  if (file.mimetype === 'application/pdf') {
    return callback(null, true);
  } else {
    req.fileValidationError = 'Для загрузки разрешен только формат PDF!';
    return callback(null, false);
  }
};

const limits = {
  fileSize: 1042 * 1024 * 20
};
// Set saved storage options:
const upload = multer({storage, fileFilter, limits});

export {upload};