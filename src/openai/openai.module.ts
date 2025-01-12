import { DynamicModule, Global, Module } from '@nestjs/common';
import { OpenAiModuleOptions } from './config.interface';

@Global()
@Module({})
export class OpenAiModule {
    static forRoot(configs: OpenAiModuleOptions): DynamicModule {
        return {
            module: OpenAiModule,
            providers: [
                {
                    provide: 'OPENAI_CONFIG',
                    useValue: configs,
                },
                OpenAiClientProvider,
            ],
            exports: [],
        };
    }
}
