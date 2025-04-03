export class IncomesAndExpensesInformationStatisticsModel {
    day: number;

    incomes: number;

    expenses: number;

    // Constructor to create an instance with named parameters
    constructor({
                    day,
                    incomes,
                    expenses,
                }: {
        day: number;
        incomes: number;
        expenses: number;
    }) {
        this.day = day;
        this.incomes = incomes;
        this.expenses = expenses;
    }

    // Static method to create an instance from a JSON object
    static fromJson(json: any): IncomesAndExpensesInformationStatisticsModel {
        return new IncomesAndExpensesInformationStatisticsModel({
            day: json.day,
            incomes: json.incomes,
            expenses: json.expenses,
        });
    }

    // Method to convert an instance to a JSON object
    toJson(): any {
        return {
            day: this.day,
            incomes: this.incomes,
            expenses: this.expenses,
        };
    }
}
