import {
    Body,
    Controller,
    Get,
    Injectable,
    Param,
    Patch,
    Post,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
@Injectable()
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post('/')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    approveReport(
        @Param('id') id: string,
        @Body() approved: ApprovedReportDto,
    ) {
        return this.reportsService.changeApproval(
            parseInt(id),
            approved.approved,
        );
    }

    @Get('/')
    @UseGuards(AuthGuard)
    getReports(@Query() query: GetEstimateDto) {
        return 'asdasd';
        // return this.reportsService.getAll();
    }
}
