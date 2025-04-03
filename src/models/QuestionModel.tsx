import { GymModel } from "./GymModel";
import { CommunityModel } from "./CommunityModel";

export class QuestionModel {
    id?: number;

    communityModel: CommunityModel;

    title: string;

    subTitle?: string;

    available: boolean;

    choices: string[];

    numberOfPossibleAnswers: number = 1;

    gym: GymModel;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    communityModel,
                    title,
                    subTitle,
                    available,
                    choices,
                    numberOfPossibleAnswers = 1,
                    gym,
                    createdAt,
                    updatedAt,
                }: {
        id?: number;
        communityModel: CommunityModel;
        title: string;
        subTitle?: string;
        available: boolean;
        choices: string[];
        numberOfPossibleAnswers?: number;
        gym: GymModel;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = id;
        this.communityModel = communityModel;
        this.title = title;
        this.subTitle = subTitle;
        this.available = available;
        this.choices = choices;
        this.numberOfPossibleAnswers = numberOfPossibleAnswers;
        this.gym = gym;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): QuestionModel {
        return new QuestionModel({
            id: json.id,
            communityModel: CommunityModel.fromJson(json.communityModel),
            title: json.title,
            subTitle: json.subTitle,
            available: json.available,
            choices: json.choices,
            numberOfPossibleAnswers: json.numberOfPossibleAnswers,
            gym: GymModel.fromJson(json.gym),
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            communityModel: this.communityModel.toJson(),
            title: this.title,
            subTitle: this.subTitle,
            available: this.available,
            choices: this.choices,
            numberOfPossibleAnswers: this.numberOfPossibleAnswers,
            gym: this.gym.toJson(),
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}
