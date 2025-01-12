import { Inject, Injectable } from '@nestjs/common';
import { OpenAiProvider } from './openai-client.provider';
import { OPENAI_CONFIG } from './config.interface';

@Injectable()
export class OpenaiService {
    openai: any;
    constructor(
        @Inject(OPENAI_CONFIG) private readonly config,
        private readonly openaiProvider: OpenAiProvider,
    ) {
        this.openai = openaiProvider.openai;
    }
    async chat({
        prompt,
        userId,
        history: [],
        role,
        temperature = 1,
        numberOfCompletions = 1,
    }) {}
}
