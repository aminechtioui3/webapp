import { GymModel } from "./GymModel";

import type { ExpenseProps } from "../sections/Expense/expense-table-row";

export class ExpenseModel {
    id: number;

    date: Date;

    note: string;

    amount: number;

    type: string;

    gym: GymModel;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    date,
                    note,
                    amount,
                    type,
                    gym,
                    createdAt = new Date(),
                    updatedAt = new Date(),
                }: {
        id: number;
        date: Date;
        note: string;
        amount: number;
        type: string;
        gym: GymModel;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = id;
        this.date = date;
        this.note = note;
        this.amount = amount;
        this.type = type;
        this.gym = gym;
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
            gym: this.gym.toJson(),
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    static fromJson(json: any): ExpenseModel {
        return new ExpenseModel({
            id: json.id,
            date: new Date(json.date),
            note: json.note,
            amount: json.amount,
            type: json.type,
            gym: GymModel.fromJson(json.gym),
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
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
