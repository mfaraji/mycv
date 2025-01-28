import { rm as remove } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
    try {
        await remove(join(__dirname, '..', 'test.sqlite'));
    } catch (error) {}
});
