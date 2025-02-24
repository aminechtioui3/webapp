import {DealProps} from "../sections/Deals/deal-table-row";

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

  constructor(
    id: number,
    title: string,
    description: string,
    header: string,
    available: boolean,
    image?: string,
    dealEndDate?: Date,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
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
    return new DealModel(
      json.id,
      json.title,
      json.description,
      json.header,
      json.available,
      json.image ?? undefined,
      json.dealEndDate ? new Date(json.dealEndDate) : undefined,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
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
      image:( this.image)?this.image:'https://example.com/avatar.jpg',
      description: this.description, // Consider making this a boolean instead of a string
    };
  }
}
