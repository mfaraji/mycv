export const OPENAI_CONFIG = 'OPENAI_CONFIG';

export interface OpenAiModuleOptions {
    apiKey: string;
    models: string;
}

export interface OpenAIModuleAsyncOptions {
    imports?: any[];
    useFactory: (
        ...args: any[]
    ) => Promise<OpenAiModuleOptions> | OpenAiModuleOptions;
    inject?: any[];
}
