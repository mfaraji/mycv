import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
    @IsNotEmpty()
    @IsString()
    make: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    @Min(1930)
    @Max(2050)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    @IsNotEmpty()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    @IsNotEmpty()
    lat: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    @Max(1000000)
    mileage: number;
}
