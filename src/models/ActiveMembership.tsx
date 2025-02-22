import {UserAccount} from "./UserAccount";
import {MembershipModel} from "./MembershipModel";

export class ActiveMembership {
    id: number;

    membership: MembershipModel;

    user: UserAccount;

    endDate: Date;

    startDate: Date;

    note?: string;

    status?: string;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor(
        id: number,
        membership: MembershipModel,
        user: UserAccount,
        startDate: Date,
        endDate: Date,
        available: boolean,
        createdAt: Date,
        updatedAt: Date,
        note?: string,
        status?: string
    ) {
        this.id = id;
        this.membership = membership;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.note = note;
        this.status = status;
    }

    static fromJson(json: any): ActiveMembership {
        return new ActiveMembership(
            json.id,
            MembershipModel.fromJson(json.membership),
            UserAccount.fromJson(json.user),
            new Date(json.startDate),
            new Date(json.endDate),
            json.available,
            new Date(json.createdAt),
            new Date(json.updatedAt),
            json.note,
            json.status
        );
    }

    toJson(): any {
        return {
            id: this.id,
            membership: this.membership.toJson(),
            user: this.user.toJson(),
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            note: this.note,
            status: this.status,
        };
    }
}