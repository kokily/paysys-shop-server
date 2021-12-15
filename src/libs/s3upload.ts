import type { ManagedUpload } from 'aws-sdk/clients/s3';
import aws from 'aws-sdk';
import fs from 'fs';
import moment from 'moment';

export type FileType = {
  name: string;
  path: string;
  type: string;
};

export type S3ReturnType = {
  key: string;
  url: string;
};

export type ParamsType = {
  Bucket: string;
  Body: fs.ReadStream;
  Key: string;
  ContentType: string;
};

// AWS Config
aws.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// S3 Version
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
});

const uploadImage = async (file: FileType): Promise<S3ReturnType> => {
  return new Promise((resolve, reject) => {
    const Params: ParamsType = {
      Bucket: 'image.paysys.kr',
      Body: fs.createReadStream(file.path),
      Key: `${moment().format('YYMMDD_HHmmss')}_${file.name.trim()}`,
      ContentType: file.type,
    };

    Params.Body.on('error', (err) => {
      reject(err);
    });

    s3.upload(Params, (err: Error, data: ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else if (data) {
        resolve({
          key: data.Key,
          url: data.Location,
        });
      }
    });
  });
};

export default uploadImage;
