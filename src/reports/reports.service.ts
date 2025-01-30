import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
    create(report: CreateReportDto, user: User) {
        const newReport = this.repo.create(report);
        newReport.user = user;
        return this.repo.save(newReport);
    }
    async changeApproval(id: number, approved: boolean) {
        const report = await this.repo.findOneBy({ id });
        report.approved = approved;
        return this.repo.save(report);
    }
}
