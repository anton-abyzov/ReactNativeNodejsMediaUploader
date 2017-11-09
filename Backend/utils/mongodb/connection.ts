import { Db, MongoClient } from 'mongodb';

const url: string = 'mongodb://softgreat:Password#31@cluster0-shard-00-00-f1m5q.mongodb.net:27017,cluster0-shard-00-01-f1m5q.mongodb.net:27017,cluster0-shard-00-02-f1m5q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
//const url: string = 'mongodb://localhost:27017/inversify-express-example';

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error, db: Db) => void) {
    MongoClient.connect(url, (error, db: Db) => {
      this.db = db;
      this.isConnected = true;

      return result(error, db);
    });
  }
}
