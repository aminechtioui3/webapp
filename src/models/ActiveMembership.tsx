import {UserAccount} from "./UserAccount";
import {MembershipModel} from "./MembershipModel";

import type {ActiveMembershipProps} from "../sections/user/user-table-row";

export class ActiveMembership {
    id: number;

    membership: MembershipModel;

    user: UserAccount;

    endDate: Date;

    startDate: Date;

    note?: string;

    price: number;

    paymentPercent: number = 100;

    status?: string;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    membership,
                    user,
                    startDate,
                    endDate,
                    price,
                    paymentPercent,
                    available,
                    createdAt,
                    updatedAt,
                    note,
                    status,
                }: {
        id: number;
        membership: MembershipModel;
        user: UserAccount;
        startDate: Date;
        endDate: Date;
        price: number;
        paymentPercent: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
        note?: string;
        status?: string;
    }) {
        this.id = id;
        this.membership = membership;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.paymentPercent = paymentPercent;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.note = note;
        this.status = status;
    }

    static fromJson(json: any): ActiveMembership {
        return new ActiveMembership({
            id: json.id,
            membership: MembershipModel.fromJson(json.membership),
            user: UserAccount.fromJson(json.user),
            startDate: new Date(json.startDate),
            endDate: new Date(json.endDate),
            price: json.price,
            paymentPercent: json.paymentPercent,
            available: json.available,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            note: json.note,
            status: json.status,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            membership: this.membership.toJson(),
            user: this.user.toJson(),
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            price: this.price,
            paymentPercent: this.paymentPercent,
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            note: this.note,
            status: this.status,
        };
    }

    toActiveMembershipProps(): ActiveMembershipProps {
        return {
            id: this.id,
            membership: this.membership.toJson(),
            user: this.user.toJson(),
            startDate: this.startDate,
            endDate: this.endDate,
            price: this.price,
            paymentPercent: this.paymentPercent,
            note: this.note,
            status: this.status,
        };
    }
}
