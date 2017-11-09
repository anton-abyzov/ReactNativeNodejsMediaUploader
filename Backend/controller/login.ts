import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { Request } from 'express';
import { Media } from '../models/media';

import TYPES from '../constant/types';

@injectable()
@controller('/media')
export class MediaController {

  constructor( ) { }

  @httpGet('/')
  public getMedia(): Promise<Media[]> {
    
  }

  @httpGet('/:id')
  public getMediaById(request: Request): Promise<Media> {
    
  }

  @httpPost('/')
  public uploadMedia(request: Request): Promise<Media> {
    
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
