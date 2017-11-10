import {
  controller, httpGet, httpPost//, httpPut, httpDelete
} from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { Request } from 'express';
import { Media } from '../models/media';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constant/types';
import Awss3Service from '../services/awss3service';
import UUidv1 from 'uuid/v1';

@injectable()
@controller('/media')
export class MediaController {
  @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient;
  @inject(TYPES.Awss3Service) awss3Service: Awss3Service
  constructor( ) { }

  @httpGet('/')
  public getMedia(): Promise<Media[]> {
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
  public uploadMedia(request: Request): Promise<Media> {
    
    const media = request.body;
    const uuidv1 = UUidv1;
    this.awss3Service.uploadMedia(uuidv1, media);
    return new Promise<Media>((resolve, reject) => {
      this.mongoClient.insert('Media', media, (error, data: Media) => {
        resolve(data);
      });
    });
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
