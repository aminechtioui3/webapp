import { UserAccount } from "./UserAccount";
import { QuestionModel } from "./QuestionModel";

export class QuestionResponse {
    id?: number;

    userAccount: UserAccount;

    question: QuestionModel;

    choices: string[];

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    userAccount,
                    question,
                    choices,
                    createdAt,
                    updatedAt,
                }: {
        id?: number;
        userAccount: UserAccount;
        question: QuestionModel;
        choices: string[];
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = id;
        this.userAccount = userAccount;
        this.question = question;
        this.choices = choices;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): QuestionResponse {
        return new QuestionResponse({
            id: json.id,
            userAccount: UserAccount.fromJson(json.userAccount),
            question: QuestionModel.fromJson(json.question),
            choices: json.choices,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            userAccount: this.userAccount.toJson(),
            question: this.question.toJson(),
            choices: this.choices,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}
