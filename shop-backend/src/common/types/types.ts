export interface MongoDBTimeouts {
  serverSelection: number;
  socket: number;
  buffer: number;
}

export interface EnvVars {
  PORT: number;
  MONGO_URI: string;
  DB_NAME: string;
}
