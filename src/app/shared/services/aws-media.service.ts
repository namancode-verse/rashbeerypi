import { Injectable } from '@angular/core';
import S3 from 'aws-sdk/clients/s3';
import { Observable, Observer } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class AWSMediaService {
     public uploadFileOnServer(file: any, buildingIdentifier: any) {
          //
          let fileID = uuid();
          let envAWS = environment.config.aws;
          let contentType = file.type;
          let newFileName: string = envAWS.serverName + '/' + buildingIdentifier + '/' + fileID + '.pdf';

          const bucket = new S3({
               secretAccessKey: envAWS.secretAccessKey,
               accessKeyId: envAWS.accessKeyID,
               region: envAWS.region
          });

          const params = {
               Bucket: envAWS.bucket,
               Key: newFileName,
               Body: file,
               ContentType: contentType
          };

          return new Observable((observer: Observer<object>) => {
               bucket
                    .upload(params)
                    .on('httpUploadProgress', function (event) {})
                    .send(function (error: any, response: any) {
                         if (error) {
                              observer.error(error);
                              observer.complete();
                         } else {
                              observer.next(response);
                              observer.complete();
                         }
                    });
          });
     }
}
