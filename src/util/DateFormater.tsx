export class DateFormater {
    date: string

    constructor(date: Date) {
        this.date = `${date.toDateString()} ${date.toTimeString()}`;
    }
}