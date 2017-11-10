import { injectable } from 'inversify';
var AWS = require('aws-sdk')    ;

// For dev purposes only
AWS.config.update({ accessKeyId: 'AKIAI5MG45RLFOB2NHUA', "region": "us-west-1" });

@injectable()
export default class Awss3Service {
    public uploadMedia(guid, data) {
        console.log('guid '+guid);
        var base64data = JSON.stringify(data);
        var params = {
            Body: base64data, 
            Bucket: "softgreat", 
            Key: "e870a511b5efc013c5185c22c6719b0d60ac047fae849853008517194974a015", 
            ServerSideEncryption: "AES256", 
            Tagging: "key1=value1&key2=value2"
           };
           var s3 = new AWS.S3();
           console.log('before posting to aws');
           s3.putObject(params, function(err, data) {
               console.log('aws sent result');
             if (err) console.log(err, err.stack); // an error occurred
             else     console.log("success" + data);           // successful response
             /*
             data = {
              ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
              ServerSideEncryption: "AES256", 
              VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
             }
             */
           });




        // Read in the file, convert it to base64, store to S3
        //fs.readFile(guid, function (err, data) {
            // if (err) { throw err; }
            // console.log('uploading to aws');
            // var base64data = new Buffer(data, 'binary');

            // var s3 = new AWS.S3();
            // s3.client.putObject({
            //     Bucket: 'softgreat',
            //     Key: guid,
            //     Body: base64data,
            //     ACL: 'public-read'
            // }, function (err, resp) {
            //     if (err) {
            //         console.log("error" + err);
            //     } else {
            //         console.log(arguments);
            //         console.log('Successfully uploaded media.');
            //     }
            // });

        //});
    }

    public downloadMedia() {

    }
}