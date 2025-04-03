import {IncomesInformationStatisticsModelForThisYear} from "./enumeration/IncomesInformationStatisticsModelForThisYear";
import {IncomesAndExpensesInformationStatisticsModel} from "./enumeration/IncomesAndExpensesInformationStatisticsModel";
import {MembershipsTypesStatisticsModel} from "./enumeration/MembershipsTypesStatisticsModel";

export class GymStatistics {
    totalActiveMembers: number;

    totalInactiveMembers: number;

    totalMembers: number;

    newSubscriptionLastMonth: number;

    newSubscriptionLastYear: number;

    newSubscriptionThisYear: number;

    newSubscriptionLastWeek: number;

    membershipsAboutToExpireThisMonth: number;

    totalEstimatedIncomesFromMembershipsThisMonth: number;

    totalIncomesThisYear: IncomesInformationStatisticsModelForThisYear[];

    totalIncomesThisMonth: IncomesAndExpensesInformationStatisticsModel[];

    totalIncomesLastMonth: IncomesAndExpensesInformationStatisticsModel[];

    totalMembershipsTypesStatisticsModel: MembershipsTypesStatisticsModel[];

    totalProductsInTheShop: number;

    ordersWaitingForConfirmation: number;

    totalOfOrders: number;

    constructor({
                    totalActiveMembers,
                    totalInactiveMembers,
                    totalMembers,
                    newSubscriptionLastMonth,
                    newSubscriptionLastYear,
                    newSubscriptionThisYear,
                    newSubscriptionLastWeek,
                    membershipsAboutToExpireThisMonth,
                    totalEstimatedIncomesFromMembershipsThisMonth,
                    totalIncomesThisYear,
                    totalIncomesThisMonth,
                    totalIncomesLastMonth,
                    totalMembershipsTypesStatisticsModel,
                    totalProductsInTheShop,
                    ordersWaitingForConfirmation,
                    totalOfOrders,
                }: {
        totalActiveMembers: number;
        totalInactiveMembers: number;
        totalMembers: number;
        newSubscriptionLastMonth: number;
        newSubscriptionLastYear: number;
        newSubscriptionThisYear: number;
        newSubscriptionLastWeek: number;
        membershipsAboutToExpireThisMonth: number;
        totalEstimatedIncomesFromMembershipsThisMonth: number;
        totalIncomesThisYear: IncomesInformationStatisticsModelForThisYear[];
        totalIncomesThisMonth: IncomesAndExpensesInformationStatisticsModel[];
        totalIncomesLastMonth: IncomesAndExpensesInformationStatisticsModel[];
        totalMembershipsTypesStatisticsModel: MembershipsTypesStatisticsModel[];
        totalProductsInTheShop: number;
        ordersWaitingForConfirmation: number;
        totalOfOrders: number;
    }) {
        this.totalActiveMembers = totalActiveMembers;
        this.totalInactiveMembers = totalInactiveMembers;
        this.totalMembers = totalMembers;
        this.newSubscriptionLastMonth = newSubscriptionLastMonth;
        this.newSubscriptionLastYear = newSubscriptionLastYear;
        this.newSubscriptionThisYear = newSubscriptionThisYear;
        this.newSubscriptionLastWeek = newSubscriptionLastWeek;
        this.membershipsAboutToExpireThisMonth = membershipsAboutToExpireThisMonth;
        this.totalEstimatedIncomesFromMembershipsThisMonth = totalEstimatedIncomesFromMembershipsThisMonth;
        this.totalIncomesThisYear = totalIncomesThisYear;
        this.totalIncomesThisMonth = totalIncomesThisMonth;
        this.totalIncomesLastMonth = totalIncomesLastMonth;
        this.totalMembershipsTypesStatisticsModel = totalMembershipsTypesStatisticsModel;
        this.totalProductsInTheShop = totalProductsInTheShop;
        this.ordersWaitingForConfirmation = ordersWaitingForConfirmation;
        this.totalOfOrders = totalOfOrders;
    }

    static fromJson(json: any): GymStatistics {
        return new GymStatistics({
            totalActiveMembers: json.totalActiveMembers,
            totalInactiveMembers: json.totalInactiveMembers,
            totalMembers: json.totalMembers,
            newSubscriptionLastMonth: json.newSubscriptionLastMonth,
            newSubscriptionLastYear: json.newSubscriptionLastYear,
            newSubscriptionThisYear: json.newSubscriptionThisYear,
            newSubscriptionLastWeek: json.newSubscriptionLastWeek,
            membershipsAboutToExpireThisMonth: json.membershipsAboutToExpireThisMonth,
            totalEstimatedIncomesFromMembershipsThisMonth: json.totalEstimatedIncomesFromMembershipsThisMonth,
            totalIncomesThisYear: json.totalIncomesThisYear.map((item: any) =>
                IncomesInformationStatisticsModelForThisYear.fromJson(item)
            ),
            totalIncomesThisMonth: json.totalIncomesThisMonth.map((item: any) =>
                IncomesAndExpensesInformationStatisticsModel.fromJson(item)
            ),
            totalIncomesLastMonth: json.totalIncomesLastMonth.map((item: any) =>
                IncomesAndExpensesInformationStatisticsModel.fromJson(item)
            ),
            totalMembershipsTypesStatisticsModel: json.totalMembershipsTypesStatisticsModel.map((item: any) =>
                MembershipsTypesStatisticsModel.fromJson(item)
            ),
            totalProductsInTheShop: json.totalProductsInTheShop,
            ordersWaitingForConfirmation: json.ordersWaitingForConfirmation,
            totalOfOrders: json.totalOfOrders,
        });
    }

    toJson(): any {
        return {
            totalActiveMembers: this.totalActiveMembers,
            totalInactiveMembers: this.totalInactiveMembers,
            totalMembers: this.totalMembers,
            newSubscriptionLastMonth: this.newSubscriptionLastMonth,
            newSubscriptionLastYear: this.newSubscriptionLastYear,
            newSubscriptionThisYear: this.newSubscriptionThisYear,
            newSubscriptionLastWeek: this.newSubscriptionLastWeek,
            membershipsAboutToExpireThisMonth: this.membershipsAboutToExpireThisMonth,
            totalEstimatedIncomesFromMembershipsThisMonth: this.totalEstimatedIncomesFromMembershipsThisMonth,
            totalIncomesThisYear: this.totalIncomesThisYear.map((item) => item.toJson()),
            totalIncomesThisMonth: this.totalIncomesThisMonth.map((item) => item.toJson()),
            totalIncomesLastMonth: this.totalIncomesLastMonth.map((item) => item.toJson()),
            totalMembershipsTypesStatisticsModel: this.totalMembershipsTypesStatisticsModel.map((item) =>
                item.toJson()
            ),
            totalProductsInTheShop: this.totalProductsInTheShop,
            ordersWaitingForConfirmation: this.ordersWaitingForConfirmation,
            totalOfOrders: this.totalOfOrders,
        };
    }
}
