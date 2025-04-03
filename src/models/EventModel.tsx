import { GymModel } from "./GymModel";

export class EventModel {
    id?: number;

    title: string;

    subTitle: string;

    description: string;

    image?: string;

    video?: string;

    room?: string;

    date: Date;

    durationInMinutes: number;

    alerts: string[];

    coach?: string;

    places: number = 0;

    leftPlaces: number = 0;

    reservable: boolean = false;

    calorie: number;

    price: number;

    moreInformationLink?: string;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    gym: GymModel;

    constructor({
                    title,
                    subTitle,
                    description,
                    date,
                    durationInMinutes,
                    alerts = [],
                    coach,
                    places = 0,
                    leftPlaces = 0,
                    reservable = false,
                    calorie,
                    price,
                    moreInformationLink,
                    available,
                    createdAt,
                    updatedAt,
                    gym,
                    image,
                    video,
                    room,
                }: {
        title: string;
        subTitle: string;
        description: string;
        date: Date;
        durationInMinutes: number;
        alerts?: string[];
        coach?: string;
        places?: number;
        leftPlaces?: number;
        reservable?: boolean;
        calorie: number;
        price: number;
        moreInformationLink?: string;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
        gym: GymModel;
        image?: string;
        video?: string;
        room?: string;
    }) {
        this.title = title;
        this.subTitle = subTitle;
        this.description = description;
        this.date = date;
        this.durationInMinutes = durationInMinutes;
        this.alerts = alerts;
        this.coach = coach;
        this.places = places;
        this.leftPlaces = leftPlaces;
        this.reservable = reservable;
        this.calorie = calorie;
        this.price = price;
        this.moreInformationLink = moreInformationLink;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.gym = gym;
        this.image = image;
        this.video = video;
        this.room = room;
    }

    static fromJson(json: any): EventModel {
        return new EventModel({
            title: json.title,
            subTitle: json.subTitle,
            description: json.description,
            date: new Date(json.date),
            durationInMinutes: json.durationInMinutes,
            alerts: json.alerts || [],
            coach: json.coach,
            places: json.places || 0,
            leftPlaces: json.leftPlaces || 0,
            reservable: json.reservable || false,
            calorie: json.calorie,
            price: json.price,
            moreInformationLink: json.moreInformationLink,
            available: json.available,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            gym: GymModel.fromJson(json.gym),
            image: json.image,
            video: json.video,
            room: json.room,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            subTitle: this.subTitle,
            description: this.description,
            image: this.image,
            video: this.video,
            room: this.room,
            date: this.date.toISOString(),
            durationInMinutes: this.durationInMinutes,
            alerts: this.alerts,
            coach: this.coach,
            places: this.places,
            leftPlaces: this.leftPlaces,
            reservable: this.reservable,
            calorie: this.calorie,
            price: this.price,
            moreInformationLink: this.moreInformationLink,
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            gym: this.gym.toJson(),
        };
    }
}
