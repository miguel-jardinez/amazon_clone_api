import { Global, Module } from '@nestjs/common';

import { EnvConfigService } from '../env/env.service';

@Global()
@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class SharedModule {}
