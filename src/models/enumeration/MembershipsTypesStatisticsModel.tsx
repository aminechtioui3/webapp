export class MembershipsTypesStatisticsModel {
    id: number;

    name: string;

    numberOfMembers: number;

    price: number;

    // Constructor to create an instance with named parameters
    constructor({
                    id,
                    name,
                    numberOfMembers,
                    price,
                }: {
        id: number;
        name: string;
        numberOfMembers: number;
        price: number;
    }) {
        this.id = id;
        this.name = name;
        this.numberOfMembers = numberOfMembers;
        this.price = price;
    }

    // Static method to create an instance from a JSON object
    static fromJson(json: any): MembershipsTypesStatisticsModel {
        return new MembershipsTypesStatisticsModel({
            id: json.id,
            name: json.name,
            numberOfMembers: json.numberOfMembers,
            price: json.price,
        });
    }

    // Method to convert an instance to a JSON object
    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            numberOfMembers: this.numberOfMembers,
            price: this.price,
        };
    }
}
