// eslint-disable-next-line import/no-cycle
import { GymModel } from "./GymModel";

import type { MembershipProps } from '../sections/Membership/membership-table-row';

export class MembershipModel {
  id: number;

  title: string;

  subTitle: string;

  description: string;

  image?: string;

  price: number;

  available: boolean;

  createdAt: Date;

  updatedAt: Date;

  gym: GymModel;

  constructor({
                id,
                title,
                subTitle,
                description,
                price,
                available,
                createdAt,
                updatedAt,
                gym,
                image = undefined,
              }: {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    price: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    gym: GymModel;
    image?: string;
  }) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.description = description;
    this.price = price;
    this.available = available;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.gym = gym;
    this.image = image;
  }

  static fromJson(json: any): MembershipModel {
    return new MembershipModel({
      id: json.id,
      title: json.title,
      subTitle: json.subTitle,
      description: json.description,
      price: json.price,
      available: json.available,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      gym: GymModel.fromJson(json.gym),
      image: json.image,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      subTitle: this.subTitle,
      description: this.description,
      image: this.image,
      price: this.price,
      available: this.available,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      gym: this.gym.toJson(),
    };
  }

  toMembershipProps(): MembershipProps {
    return {
      id: this.id,
      name: this.title,
      price: this.price,
      status: this.available,
      image: this.image ?? 'https://example.com/avatar.jpg',
      description: this.description, // Consider making this a boolean instead of a string
    };
  }
}
