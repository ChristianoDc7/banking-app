import { DataSource } from "typeorm";
import { UserEntities } from "../entities/UserEntities";
import { TransactionEntities } from "../entities/TransactionEntities";

// console.log(require.resolve( __dirname+"/banking.db"));

export const BankingDataSource = new DataSource({
  type: "sqlite",
  database: require.resolve( __dirname+"/banking.db"),
  synchronize: true,
  logging: false,
  entities: [UserEntities, TransactionEntities],
  migrations: [],
  subscribers: [],
})
