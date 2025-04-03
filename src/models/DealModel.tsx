import type { DealProps } from "../sections/Deals/deal-table-row";

export class DealModel {
  id: number;

  title: string;

  description: string;

  header: string;

  image?: string;

  dealEndDate?: Date;

  available: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor({
                id,
                title,
                description,
                header,
                available,
                image,
                dealEndDate,
                createdAt = new Date(),
                updatedAt = new Date(),
              }: {
    id: number;
    title: string;
    description: string;
    header: string;
    available: boolean;
    image?: string;
    dealEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.header = header;
    this.image = image;
    this.dealEndDate = dealEndDate;
    this.available = available;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): DealModel {
    return new DealModel({
      id: json.id,
      title: json.title,
      description: json.description,
      header: json.header,
      available: json.available,
      image: json.image ?? undefined,
      dealEndDate: json.dealEndDate ? new Date(json.dealEndDate) : undefined,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      header: this.header,
      image: this.image,
      dealEndDate: this.dealEndDate ? this.dealEndDate.toISOString() : null,
      available: this.available,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  toDealProps(): DealProps {
    return {
      id: this.id,
      name: this.title,
      header: this.header,
      dealEndDate: this.dealEndDate,
      status: this.available,
      image: this.image ?? 'https://example.com/avatar.jpg',
      description: this.description,
    };
  }
}
