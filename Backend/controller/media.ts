import {
  controller, httpGet, httpPost//, httpPut, httpDelete
} from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { Request } from 'express';
import { Media } from '../models/media';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constant/types';
import Awss3Service from '../services/awss3service';

@injectable()
@controller('/media')
export class MediaController {
  @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient;
  @inject(TYPES.Awss3Service) awss3Service: Awss3Service
  constructor() { }

  @httpGet('/')
  public getMedia(): Promise<Media[]> {
    console.log('getting media');
    return new Promise<Media[]>((resolve, reject) => {
      this.mongoClient.find('Media', {}, (error, data: Media[]) => {
        resolve(data);
      });
    });
  }

  @httpGet('/:id')
  public getMediaById(request: Request): Promise<Media> {
    const id = request.params.id;
    return new Promise<Media>((resolve, reject) => {
      this.mongoClient.findOneById('Media', id, (error, data: Media) => {
        resolve(data);
      });
    });
  }

  @httpPost('/')
  public uploadMedia(request: Request): Promise<string> {
    console.log('posting media');
    
    const binaryFileData = request.body;    
    const uid = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '');

    console.log("uuidv1 " + uid);
    console.log('aws ' + this.awss3Service);
    const awsPromise = this.awss3Service.uploadMedia(uid, binaryFileData)
    awsPromise.then(data => {
      console.log('aws s3 returned data '+ JSON.stringify(data));
      const media = new Media(uid, 'jpeg', uid);
      new Promise<Media>((resolve, reject) => {
        this.mongoClient.insert('Media', media, (error, data: Media) => {
          console.log('mongo data ' + data);
          if (error) {
            console.log(error);
          }
          resolve(data);
        });
      });

    }).catch(err => console.log(err));
    return awsPromise;
    
  }

  // @httpPut('/:id')
  // public updateMedia(request: Request): Promise<Media> {
  //   return this.MediaService.updateMedia(request.params.id, request.body);
  // }

  // @httpDelete('/:id')
  // public deleteMedia(request: Request): Promise<any> {
  //   return this.MediaService.deleteMedia(request.params.id);
  // }
}
