/**
 * Provides utilities to transform hydrated and persisted data.
 */
export class DateUtils {

    // -------------------------------------------------------------------------
    // Public Static Methods
    // -------------------------------------------------------------------------

    /**
     * Normalizes date object hydrated from the database.
     */
    static normalizeHydratedDate(mixedDate: Date|string|undefined): Date|string|undefined {
        if (!mixedDate)
            return mixedDate;

        const date = typeof mixedDate === "string" ? new Date(mixedDate) : mixedDate as Date;

        return date;
    }

    /**
     * Converts given value into date string in a "YYYY-MM-DD" format.
     */
    static mixedDateToDateString(value: Date|any): string|any {
        if (value instanceof Date)
            return this.formatZerolessValue(value.getFullYear()) + "-" + this.formatZerolessValue(value.getMonth() + 1) + "-" + this.formatZerolessValue(value.getDate());

        return value;
    }

    /**
     * Converts given value into date object.
     */
    static mixedDateToDate(mixedDate: Date|string, toUtc: boolean = false, useMilliseconds = true): Date {
        let date = typeof mixedDate === "string" ? new Date(mixedDate) : mixedDate;

        if (toUtc)
            date = new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds(),
                date.getUTCMilliseconds()
            );

        if (!useMilliseconds)
            date.setUTCMilliseconds(0);

        return date;
    }

    /**
     * Converts given value into time string in a "HH:mm:ss" format.
     */
    static mixedDateToTimeString(value: Date|any, skipSeconds: boolean = false): string|any {
        if (value instanceof Date)
            return this.formatZerolessValue(value.getHours()) +
                ":" + this.formatZerolessValue(value.getMinutes()) +
                (!skipSeconds ? ":" + this.formatZerolessValue(value.getSeconds()) : "");

        return value;
    }

    /**
     * Converts given value into time string in a "HH:mm:ss" format.
     */
    static mixedTimeToDate(value: Date|any): string|any {
        if (typeof value === "string") {
            const [hours, minutes, seconds] = value.split(":");
            const date = new Date();
            if (hours)
                date.setHours(parseInt(hours));
            if (minutes)
                date.setMinutes(parseInt(minutes));
            if (seconds)
                date.setSeconds(parseInt(seconds));
            return date;
        }

        return value;
    }

    /**
     * Converts given string value with "-" separator into a "HH:mm:ss" format.
     */
    static mixedTimeToString(value: string|any, skipSeconds: boolean = false): string|any {
        value = value instanceof Date ? (value.getHours() + ":" + value.getMinutes() + (!skipSeconds ? ":" + value.getSeconds() : "")) : value;
        if (typeof value === "string") {
            return value.split(":")
                .map(v => v.length === 1 ? "0" + v : v) // append zero at beginning if we have a first-zero-less number
                .join(":");
        }

        return value;
    }

    /**
     * Converts given value into datetime string in a "YYYY-MM-DD HH-mm-ss" format.
     */
    static mixedDateToDatetimeString(value: Date|any): string|any {
        if (typeof value === "string") {
            value = new Date(value);
        }
        if (value instanceof Date) {
            return this.formatZerolessValue(value.getFullYear()) + "-" +
                this.formatZerolessValue(value.getMonth() + 1) + "-" +
                this.formatZerolessValue(value.getDate()) + " " +
                this.formatZerolessValue(value.getHours()) + ":" +
                this.formatZerolessValue(value.getMinutes()) + ":" +
                this.formatZerolessValue(value.getSeconds()) + "." +
                this.formatMilliseconds(value.getUTCMilliseconds());
        }

        return value;
    }

    /**
     * Converts given value into utc datetime string in a "YYYY-MM-DD HH-mm-ss" format.
     */
    static mixedDateToUtcDatetimeString(value: Date|any): string|any {
        if (typeof value === "string") {
            value = new Date(value);
        }
        if (value instanceof Date) {
            return this.formatZerolessValue(value.getUTCFullYear()) + "-" +
                this.formatZerolessValue(value.getUTCMonth() + 1) + "-" +
                this.formatZerolessValue(value.getUTCDate()) + " " +
                this.formatZerolessValue(value.getUTCHours()) + ":" +
                this.formatZerolessValue(value.getUTCMinutes()) + ":" +
                this.formatZerolessValue(value.getUTCSeconds()) + "." +
                this.formatMilliseconds(value.getUTCMilliseconds());
        }

        return value;
    }

    /**
     * Converts each item in the given array to string joined by "," separator.
     */
    static simpleArrayToString(value: any[]|any): string[]|any {
        if (value instanceof Array) {
            return (value as any[])
                .map(i => String(i))
                .join(",");
        }

        return value;
    }

    /**
     * Converts given string to simple array split by "," separator.
     */
    static stringToSimpleArray(value: string|any): string|any {
        if (value instanceof String || typeof value === "string") {
            if (value.length > 0) {
                return value.split(",");
            } else {
                return [];
            }
        }

        return value;
    }

    static simpleJsonToString(value: any): string {
        return JSON.stringify(value);
    }

    static stringToSimpleJson(value: string) {
        return JSON.parse(value);
    }

    // -------------------------------------------------------------------------
    // Private Static Methods
    // -------------------------------------------------------------------------

    /**
     * Formats given number to "0x" format, e.g. if it is 1 then it will return "01".
     */
    private static formatZerolessValue(value: number): string {
        if (value < 10)
            return "0" + value;

        return String(value);
    }

    /**
     * Formats given number to "0x" format, e.g. if it is 1 then it will return "01".
     */
    private static formatMilliseconds(value: number): string {
        if (value < 100)
            return "0" + value;

        return String(value);
    }

}