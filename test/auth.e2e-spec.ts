import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handle sign up request', () => {
        const email = 'test12345@test.com';
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email,
                password: 'password',
            })
            .expect(201)
            .then((response) => {
                console.log(response.body);
                const { id, email } = response.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email);
            });
    });
});
