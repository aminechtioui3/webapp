import { MembershipModel } from "./MembershipModel";
import { UserAccount } from "./UserAccount";

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
        note?: string,
        status?: string,
        available: boolean = true
    ) {
        this.id = id;
        this.membership = membership;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.note = note;
        this.status = status;
        this.available = available;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
