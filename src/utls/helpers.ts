import  { parse } from 'date-fns';

export function transformDateFormat(dateStr: string) {
    try {
      const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date());
      return new Date(parsedDate);
    } catch (error) {
      console.error('Invalid date format:', error);
      return null;
    }
  }
  