import { DataSource } from 'typeorm';

import { dbConfig } from './ormConfig';

const migrationConfig = new DataSource(dbConfig);

export default migrationConfig;
