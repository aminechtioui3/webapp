import {MembershipProps} from "../sections/Membership/membership-table-row";
import {ExpenseProps} from "../sections/Expense/expense-table-row";

export class ExpenseModel {
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
    toJson(): any {
        return {
            id: this.id,
            date: this.date.toISOString(),
            note: this.note,
            amount: this.amount,
            type: this.type,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }


    static fromJson(json: any): ExpenseModel {
        return new ExpenseModel(
            json.id,
            new Date(json.date),
            json.note,
            json.amount,
            json.type,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
    }



    toExpenseProps(): ExpenseProps {
        return {
            id: this.id,
            date: this.date,
            note: this.note,
            amount: this.amount,
            type: this.type,
        };
    }
}

