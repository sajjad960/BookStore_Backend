import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3Config } from '../../../../config/config'

const s3 = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
})
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Config.bucketName,
    acl: 'public-read', // or 'private' if you want the files to be private
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      // Check file type and assign folder path accordingly
      if (file.fieldname === 'audio') {
        cb(
          null,
          'books/audio' + Date.now().toString() + '-' + file.originalname
        )
      } else if (file.fieldname === 'poster') {
        cb(
          null,
          'books/posters' + Date.now().toString() + '-' + file.originalname
        )
      }
    },
  }),
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'poster', maxCount: 1 },
])

export = upload
