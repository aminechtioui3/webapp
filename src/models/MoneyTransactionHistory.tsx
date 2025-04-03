import { GymModel } from "./GymModel";
import {CategoryOfMoneyTransactionHistory} from "./enumeration/CategoryOfMoneyTransactionHistory";

export class MoneyTransactionHistory {
    id?: number;

    date: Date;

    amount: number;

    note: string;

    category: CategoryOfMoneyTransactionHistory = CategoryOfMoneyTransactionHistory.MEMBERSHIPS;

    gym: GymModel;

    constructor({
                    id,
                    date,
                    amount,
                    note,
                    category = CategoryOfMoneyTransactionHistory.MEMBERSHIPS,
                    gym,
                }: {
        id?: number;
        date: Date;
        amount: number;
        note: string;
        category?: CategoryOfMoneyTransactionHistory;
        gym: GymModel;
    }) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.note = note;
        this.category = category;
        this.gym = gym;
    }

    static fromJson(json: any): MoneyTransactionHistory {
        return new MoneyTransactionHistory({
            id: json.id,
            date: new Date(json.date),
            amount: json.amount,
            note: json.note,
            category: json.category,
            gym: GymModel.fromJson(json.gym),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            date: this.date.toISOString(),
            amount: this.amount,
            note: this.note,
            category: this.category,
            gym: this.gym.toJson(),
        };
    }
}
