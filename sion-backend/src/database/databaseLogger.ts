import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger as SionLogger } from 'sion-logger';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = SionLogger('SQL');

  logQuery(query: string, parameters?: any[]) {
    this.logger.development.info({
      involved: 'query',
      meta: { query, parameters: this.stringifyParameters(parameters) },
    });
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.development.error({
      involved: 'query_error',
      meta: { error, query, parameters: this.stringifyParameters(parameters) },
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.development.warn({
      involved: 'slow_query',
      meta: { time, query, parameters: this.stringifyParameters(parameters) },
    });
  }

  logSchemaBuild(message: string) {
    this.logger.development.info({
      involved: 'schema_build',
      meta: { message },
    });
  }

  logMigration(message: string) {
    this.logger.development.info({
      involved: 'migration',
      meta: { message },
    });
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'log') {
      return this.logger.development.log(message);
    }
    if (level === 'info') {
      return this.logger.development.debug(message);
    }
    if (level === 'warn') {
      return this.logger.development.warn(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}

export default DatabaseLogger;
