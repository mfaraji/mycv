import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
} from 'class-validator';

export class CreateReportDto {
    @IsNumber()
    @IsNotEmpty()
    @Max(1000000)
    price: number;

    @IsNotEmpty()
    @IsString()
    make: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsLongitude()
    @IsNotEmpty()
    lng: number;

    @IsLatitude()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    @Max(1000000)
    mileage: number;
}
