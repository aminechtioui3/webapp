export class IncomesInformationStatisticsModelForThisYear {
    month: number;

    year: number;

    incomes: number;

    expenses: number;

    // Constructor to create an instance with named parameters
    constructor({
                    month,
                    year,
                    incomes,
                    expenses,
                }: {
        month: number;
        year: number;
        incomes: number;
        expenses: number;
    }) {
        this.month = month;
        this.year = year;
        this.incomes = incomes;
        this.expenses = expenses;
    }

    // Static method to create an instance from a JSON object
    static fromJson(json: any): IncomesInformationStatisticsModelForThisYear {
        return new IncomesInformationStatisticsModelForThisYear({
            month: json.month,
            year: json.year,
            incomes: json.incomes,
            expenses: json.expenses,
        });
    }

    // Method to convert an instance to a JSON object
    toJson(): any {
        return {
            month: this.month,
            year: this.year,
            incomes: this.incomes,
            expenses: this.expenses,
        };
    }
}
