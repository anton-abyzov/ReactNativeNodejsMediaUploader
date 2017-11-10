import { injectable } from 'inversify';
var AWS = require('aws-sdk')    ;

// For dev purposes only
AWS.config.update({ accessKeyId: 'e870a511b5efc013c5185c22c6719b0d60ac047fae849853008517194974a015' });

@injectable()
export default class Awss3Service {
    public uploadMedia(guid, data) {
        console.log('guid '+guid);
        // Read in the file, convert it to base64, store to S3
        //fs.readFile(guid, function (err, data) {
            // if (err) { throw err; }
            console.log(data);
            var base64data = new Buffer(data, 'binary');

            var s3 = new AWS.S3();
            s3.client.putObject({
                Bucket: 'softgreat',
                Key: guid,
                Body: base64data,
                ACL: 'public-read'
            }, function (err, resp) {
                if (err) {
                    console.log("error" + err);
                } else {
                    console.log(arguments);
                    console.log('Successfully uploaded media.');
                }
            });

        //});
    }

    public downloadMedia() {

    }
}