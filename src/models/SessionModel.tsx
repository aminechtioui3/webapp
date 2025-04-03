import type { SessionProps } from "../sections/Sessions/session-table-row";

export class SessionModel {
  id: number;

  title: string;

  subTitle: string;

  description: string;

  image?: string;

  available: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor({
                id,
                title,
                subTitle,
                description,
                available,
                image = "", // Default to an empty string if not provided
                createdAt = new Date(),
                updatedAt = new Date(),
              }: {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    available: boolean;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
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
    return new SessionModel({
      id: json.id,
      title: json.title,
      subTitle: json.subTitle,
      description: json.description,
      available: json.available,
      image: json.image ?? "",  // Default to empty string if not provided
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
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
      subTitle: this.subTitle,
      description: this.description,
      available: this.available,
      image: this.image || 'https://example.com/avatar.jpg',  // Provide default image if missing
    };
  }
}
