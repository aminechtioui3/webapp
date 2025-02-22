export class ActiveMembershipCreationDTO {
    id?: number;

    membershipId?: number;

    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    weight?: number;
    height?: number;
    location?: string;
    phone?: string;
    gender?: string;
    endDate?: Date;
    startDate?: Date;
    note?: string;
    status?: string;

    constructor(data?: Partial<ActiveMembershipCreationDTO>) {
        if (data) {
            this.id = data.id;
            this.membershipId = data.membershipId;
            this.email = data.email;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.birthday = data.birthday;
            this.weight = data.weight;
            this.height = data.height;
            this.location = data.location;
            this.phone = data.phone;
            this.gender = data.gender;
            this.endDate = data.endDate ? new Date(data.endDate) : undefined;
            this.startDate = data.startDate ? new Date(data.startDate) : undefined;
            this.note = data.note;
            this.status = data.status;
        }
    }

    toJSON(): any {
        return {
            id: this.id,
            membershipId: this.membershipId,

            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            birthday: this.birthday,
            weight: this.weight,
            height: this.height,
            location: this.location,
            phone: this.phone,
            gender: this.gender,
            endDate: this.endDate?.toISOString(),
            startDate: this.startDate?.toISOString(),
            note: this.note,
            status: this.status,
        };
    }

    static fromJSON(json: any): ActiveMembershipCreationDTO {
        return new ActiveMembershipCreationDTO({
            id: json.id,
            membershipId: json.membershipId,

            email: json.email,
            firstName: json.firstName,
            lastName: json.lastName,
            birthday: json.birthday,
            weight: json.weight,
            height: json.height,
            location: json.location,
            phone: json.phone,
            gender: json.gender,
            endDate: json.endDate ? new Date(json.endDate) : undefined,
            startDate: json.startDate ? new Date(json.startDate) : undefined,
            note: json.note,
            status: json.status,
        });
    }
}
