import type { Role } from './Role';

export class UserAccount {
  id: number;

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

  contractIsActivated: boolean | undefined;

  contractActivatedUntil?: Date;

  isVerified: boolean;

  accountNonExpired: boolean;

  accountNonLocked: boolean;

  credentialsNonExpired: boolean;

  enabled: boolean;

  available?: boolean;

  canUseCommunityChat: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor({
    id,
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    createdAt,
    updatedAt,
    lastSeen = undefined,
    image = 'https://example.com/avatar.jpg', // Default to an example avatar if no image is provided
    birthday,
    weight,
    height,
    physicalActivity,
    gender,
    deviceToken,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
    webSite,
    tikTok,
    contractActivatedUntil,
    isVerified = true, // Default to true
    accountNonExpired = true, // Default to true
    accountNonLocked = true, // Default to true
    credentialsNonExpired = true, // Default to true
    enabled = true, // Default to true
    available,
    canUseCommunityChat = true, // Default to true
  }: {
    id: number;
    email: string;
    password: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    lastSeen?: Date;
    image?: string;
    birthday?: Date;
    weight?: number;
    height?: number;
    physicalActivity?: string;
    gender?: string;
    deviceToken?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    webSite?: string;
    tikTok?: string;
    contractActivatedUntil?: Date;
    isVerified?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    enabled?: boolean;
    available?: boolean;
    canUseCommunityChat?: boolean;
  }) {
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
      birthday: this.birthday?.toISOString(),
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
    return new UserAccount({
      id: json.id,
      email: json.email,
      password: json.password,
      role: json.role,
      firstName: json.firstName,
      lastName: json.lastName,
      phone: json.phone,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      lastSeen: json.lastSeen ? new Date(json.lastSeen) : undefined,
      image: json.image ?? 'https://example.com/avatar.jpg',
      birthday: new Date(json.birthday),
      weight: json.weight,
      height: json.height,
      physicalActivity: json.physicalActivity,
      gender: json.gender,
      deviceToken: json.deviceToken,
      facebook: json.facebook,
      twitter: json.twitter,
      linkedin: json.linkedin,
      instagram: json.instagram,
      youtube: json.youtube,
      webSite: json.webSite,
      tikTok: json.tikTok,
      contractActivatedUntil: json.contractActivatedUntil
        ? new Date(json.contractActivatedUntil)
        : undefined,
      isVerified: json.isVerified,
      accountNonExpired: json.accountNonExpired,
      accountNonLocked: json.accountNonLocked,
      credentialsNonExpired: json.credentialsNonExpired,
      enabled: json.enabled,
      available: json.available,
      canUseCommunityChat: json.canUseCommunityChat,
    });
  }

  /*  toUserProps(): UserProps {
      return {
      id: this.id,
      name: this.firstName,
      role: '',
      status: 'Active',
      avatarUrl: 'https://example.com/avatar.jpg',
      isVerified: this.isVerified.toString(), // Consider making this a boolean instead of a string
    };
  } */
}
