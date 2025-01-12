import { Inject, Injectable } from '@nestjs/common';
import OpenAIApi from 'openai';
import { OPENAI_CONFIG, OpenAiModuleOptions } from './config.interface'; // Adjust the path as necessary

@Injectable()
export class OpenAiProvider {
    public openai: OpenAIApi;

    constructor(
        @Inject(OPENAI_CONFIG) private readonly config: OpenAiModuleOptions,
    ) {
        this.openai = new OpenAIApi({
            apiKey: config.apiKey,
        });
    }
}
