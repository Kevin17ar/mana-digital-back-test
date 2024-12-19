import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { DatePattern } from '../../common/enums/date-pattern.enum';

@Injectable()
export class UtilsService {
    formatDate(date: Date, pattern: DatePattern = DatePattern.YYYYMMDD): string {
        if (!date || date.valueOf() === -62135582772000 || date.getTime() === 0) {
            return null
        }

        return format(date, pattern);
    }
}
