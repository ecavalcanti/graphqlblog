import { Sequelize } from 'sequelize-typescript'

export interface IDbConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: string
}

export const configure = (config: IDbConfig): Sequelize => {
  const sequelize = new Sequelize({
    ...config,
    operatorsAliases: false,
    modelPaths: [`${__dirname}./../models`]
  })
  return sequelize
}


