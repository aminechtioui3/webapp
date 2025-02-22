class ExpenseModel {
    id: number;
    date: Date;
    note: string;
    amount: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        date: Date,
        note: string,
        amount: number,
        type: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.date = date;
        this.note = note;
        this.amount = amount;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Method to convert class instance to JSON
    toJson(): object {
        return {
            id: this.id,
            date: this.date.toISOString(),
            note: this.note,
            amount: this.amount,
            type: this.type,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    // Static method to create class instance from JSON
    static fromJson(json: string): ExpenseModel {
        const obj = JSON.parse(json);
        return new ExpenseModel(
            obj.id,
            new Date(obj.date),
            obj.note,
            obj.amount,
            obj.type,
            new Date(obj.createdAt),
            new Date(obj.updatedAt)
        );
    }
}
