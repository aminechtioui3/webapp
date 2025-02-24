import {MembershipProps} from "../sections/Membership/membership-table-row";

export class SessionModel {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    title: string,
    subTitle: string,
    description: string,
    available: boolean,
    image?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.description = description;
    this.image = image;
    this.available = available;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): SessionModel {
    return new SessionModel(
      json.id,
      json.title,
      json.subTitle,
      json.description,
      json.available,
      json.image ?? undefined,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      subTitle: this.subTitle,
      description: this.description,
      image: this.image,
      available: this.available,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
  toSessionProps(): SessionProps {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subTitle,
      available: this.available,
      image:( this.image)?this.image:'https://example.com/avatar.jpg',
      description: this.description, // Consider making this a boolean instead of a string
    };
  }

}
