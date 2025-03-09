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

    constructor(
        id?: number,

    membershipId?: number,

    email?: string,
    firstName?: string,
    lastName?: string,
    birthday?: Date,
    weight?: number,
    height?: number,
    location?: string,
    phone?: string,
    gender?: string,
    endDate?: Date,
    startDate?: Date,
    note?: string,
    status?: string,
    ) {

            this.id = id;
            this.membershipId = membershipId;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthday = birthday;
            this.weight = weight;
            this.height = height;
            this.location = location;
            this.phone = phone;
            this.gender = gender;
            this.endDate = endDate ? new Date(endDate) : undefined;
            this.startDate = startDate ? new Date(startDate) : undefined;
            this.note = note;
            this.status = status;

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
        return new ActiveMembershipCreationDTO(
            undefined,
            json.membershipId,
            json.email,
            json.firstName,
            json.lastName,
           json.birthday,
           json.weight,
           json.height,
            json.location,
             json.phone,
             json.gender,
            json.endDate ? new Date(json.endDate) : undefined,
             json.startDate ? new Date(json.startDate) : undefined,
            json.note,
            json.status,
        );
    }
}
