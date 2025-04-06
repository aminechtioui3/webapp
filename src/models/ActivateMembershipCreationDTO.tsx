export class ActiveMembershipCreationDTO {
    id?: number;

    gymId: number;

    membershipId: number;

    email: string;

    firstName: string;

    lastName: string;

    birthday: Date;

    phone: string;

    gender: string;

    endDate: Date;

    startDate: Date;

    price: number;

    paymentPercent: number = 100;

    note?: string;

    status?: string;

    constructor({
                    gymId,
                    membershipId,
                    email,
                    firstName,
                    lastName,
                    birthday,
                    phone,
                    gender,
                    endDate,
                    startDate,
                    price,
                    paymentPercent = 100,
                    note,
                    status,
                }: {
        gymId: number;
        membershipId: number;
        email: string;
        firstName: string;
        lastName: string;
        birthday: Date;
        phone: string;
        gender: string;
        endDate: Date;
        startDate: Date;
        price: number;
        paymentPercent?: number;
        note?: string;
        status?: string;
    }) {
        this.gymId = gymId;
        this.membershipId = membershipId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.phone = phone;
        this.gender = gender;
        this.endDate = endDate;
        this.startDate = startDate;
        this.price = price;
        this.paymentPercent = paymentPercent;
        this.note = note;
        this.status = status;
    }

    static fromJson(json: any): ActiveMembershipCreationDTO {
        return new ActiveMembershipCreationDTO({
            gymId: json.gymId,
            membershipId: json.membershipId,
            email: json.email,
            firstName: json.firstName,
            lastName: json.lastName,
            birthday: new Date(json.birthday),

            phone: json.phone,
            gender: json.gender,
            endDate: new Date(json.endDate),
            startDate: new Date(json.startDate),
            price: json.price,
            paymentPercent: json.paymentPercent,
            note: json.note,
            status: json.status,
        });
    }

    toJson(): any {
        return {
            gymId: this.gymId,
            membershipId: this.membershipId,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            birthday: this.birthday.toISOString(),

            phone: this.phone,
            gender: this.gender,
            endDate: this.endDate.toISOString(),
            startDate: this.startDate.toISOString(),
            price: this.price,
            paymentPercent: this.paymentPercent,
            note: this.note,
            status: this.status,
        };
    }
}
