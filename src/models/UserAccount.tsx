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

    birthday?: string;

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
        options?: Partial<UserAccount>
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.createdAt = new Date();
        this.updatedAt = new Date();

        // Merge optional properties if provided
        Object.assign(this, options);
    }

    getUsername(): string {
        return this.email;
    }

    getAuthorities(): string[] {
        return [`ROLE_${this.role}`];
    }

    isAccountNonExpired(): boolean {
        return this.accountNonExpired;
    }

    isAccountNonLocked(): boolean {
        return this.accountNonLocked;
    }

    isCredentialsNonExpired(): boolean {
        return this.credentialsNonExpired;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    toUserProps() : UserProps
    {
        const user: UserProps = {
            id: this.id,
            name: this.firstName,
            role: "",
            status: "Active",
            avatarUrl: "https://example.com/avatar.jpg",
            isVerified: this.isVerified.toString(), // Consider making this a boolean instead of a string
          };

          return user;
    }
}
