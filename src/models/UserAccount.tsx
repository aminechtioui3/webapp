import { UserProps } from "src/sections/user/user-table-row";
import { Role } from "./Role";

export class UserAccount {
    id: string;
    email: string;
    password: string;
    lastSeen?: Date;
    role: Role;
    firstName: string;
    lastName: string;
    image?: string;
    birthday?: Date;
    weight?: number;
    height?: number;
    physicalActivity?: string;
    phone: string;
    gender?: string;
    deviceToken?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    webSite?: string;
    tikTok?: string;
    contractIsActivated: boolean = false;
    contractActivatedUntil?: Date;
    isVerified: boolean = true;
    accountNonExpired: boolean = true;
    accountNonLocked: boolean = true;
    credentialsNonExpired: boolean = true;
    enabled: boolean = true;
    available?: boolean;
    canUseCommunityChat: boolean = true;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        email: string,
        password: string,
        role: Role,
        firstName: string,
        lastName: string,
        phone: string,
        createdAt: Date,
        updatedAt: Date,
        lastSeen?: Date,
        image?: string,
        birthday?: Date,
        weight?: number,
        height?: number,
        physicalActivity?: string,
        gender?: string,
        deviceToken?: string,
        facebook?: string,
        twitter?: string,
        linkedin?: string,
        instagram?: string,
        youtube?: string,
        webSite?: string,
        tikTok?: string,
        contractActivatedUntil?: Date,
        isVerified: boolean = true,
        accountNonExpired: boolean = true,
        accountNonLocked: boolean = true,
        credentialsNonExpired: boolean = true,
        enabled: boolean = true,
        available?: boolean,
        canUseCommunityChat: boolean = true
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastSeen = lastSeen;
        this.image = image;
        this.birthday = birthday;
        this.weight = weight;
        this.height = height;
        this.physicalActivity = physicalActivity;
        this.gender = gender;
        this.deviceToken = deviceToken;
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.youtube = youtube;
        this.webSite = webSite;
        this.tikTok = tikTok;
        this.contractActivatedUntil = contractActivatedUntil;
        this.isVerified = isVerified;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.available = available;
        this.canUseCommunityChat = canUseCommunityChat;
    }

    // Convert the class instance to JSON
    toJson(): any {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            lastSeen: this.lastSeen?.toISOString(),
            role: this.role,
            firstName: this.firstName,
            lastName: this.lastName,
            image: this.image,
            birthday: this.birthday,
            weight: this.weight,
            height: this.height,
            physicalActivity: this.physicalActivity,
            phone: this.phone,
            gender: this.gender,
            deviceToken: this.deviceToken,
            facebook: this.facebook,
            twitter: this.twitter,
            linkedin: this.linkedin,
            instagram: this.instagram,
            youtube: this.youtube,
            webSite: this.webSite,
            tikTok: this.tikTok,
            contractIsActivated: this.contractIsActivated,
            contractActivatedUntil: this.contractActivatedUntil?.toISOString(),
            isVerified: this.isVerified,
            accountNonExpired: this.accountNonExpired,
            accountNonLocked: this.accountNonLocked,
            credentialsNonExpired: this.credentialsNonExpired,
            enabled: this.enabled,
            available: this.available,
            canUseCommunityChat: this.canUseCommunityChat,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    // Convert JSON back to a class instance
    static fromJson(json: any): UserAccount {
        return new UserAccount(
            json.id,
            json.email,
            json.password,
            json.role,
            json.firstName,
            json.lastName,
            json.phone,
            new Date(json.createdAt),
            new Date(json.updatedAt),
            json.lastSeen ? new Date(json.lastSeen) : undefined,
            ((json.image!=null)||(json.image!=="")) ? json.image : "https://example.com/avatar.jpg",
            json.birthday,
            json.weight,
            json.height,
            json.physicalActivity,
            json.gender,
            json.deviceToken,
            json.facebook,
            json.twitter,
            json.linkedin,
            json.instagram,
            json.youtube,
            json.webSite,
            json.tikTok,
            json.contractActivatedUntil ? new Date(json.contractActivatedUntil) : undefined,
            json.isVerified,
            json.accountNonExpired,
            json.accountNonLocked,
            json.credentialsNonExpired,
            json.enabled,
            json.available,
            json.canUseCommunityChat
        );
    }
}




