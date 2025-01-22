import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeAuthService = {
            signIn: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
            // signUp: () => {},
        };
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'test@test.com',
                    password: '123',
                } as User);
            },
            create: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
            // remove: () => {},
            // update: () => {},
            find: (email: string) => {
                return Promise.resolve([{ id: 1, email } as User]);
            },
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: fakeUsersService },
                { provide: AuthService, useValue: fakeAuthService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findAllusers return all users with a given email', async () => {
        const users = await controller.findAllusers('test@test.com');
        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual('test@test.com');
    });
    it('findUser return a single user with given id', async () => {
        const user = await controller.findUser('1');
        expect(user).toBeDefined();
    });
    it('findUser throws an error if user with a given id not found', async () => {
        fakeUsersService.findOne = () => null;
        await expect(controller.findUser('1')).rejects.toThrow(
            NotFoundException,
        );
    });
    it('signIn updates session object and returns user', async () => {
        const session = { userId: -10 };
        const user = await controller.signIn(
            { email: 'test@test.com', password: '123' },
            session,
        );
        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });
});
