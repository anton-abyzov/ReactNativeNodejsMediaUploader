import { injectable } from 'inversify';
var AWS = require('aws-sdk')    ;

// For dev purposes only, find secret key at your https://docs.google.com/document/d/1jbsyeiIyhp9nbMPgxQxUwIMNKfmlTjIfLhAjs6Lewk4/edit
AWS.config.update({ accessKeyId: 'AKIAI5MG45RLFOB2NHUA', secretAccessKey: "<insert your secret key>", "region": "us-west-1" });

@injectable()
export default class Awss3Service {
    public uploadMedia(guid, data): Promise<string> {
        console.log('guid '+guid);
        const binaryData = Object.getOwnPropertyNames(data)[0];        
        var base64data = JSON.stringify(binaryData);
        var params = {
            Body: base64data, 
            Bucket: "softgreat", 
            Key: guid + '.jpeg', 
            ServerSideEncryption: "AES256", 
            Tagging: "key1=value1&key2=value2"
           };
           var s3 = new AWS.S3();
           console.log('before posting to aws');
           return s3.putObject(params).promise();




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