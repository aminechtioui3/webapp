export enum ApplicationReceivers {
  ALL,
  USER,
  MEMBERSHIP,
}

export class NotificationModel {
  id: number;
  title: string;
  description: string;
  header: string;
  image?: string;
  about?: string;
  receiversIds?: string;
  receiversType: ApplicationReceivers;
  createdAt: string;

  constructor(
    id: number,
    title: string,
    description: string,
    header: string,
    image?: string,
    about?: string,
    receiversIds?: string,
    receiversType: ApplicationReceivers = ApplicationReceivers.ALL,
    createdAt: string = new Date().toISOString()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.header = header;
    this.image = image;
    this.about = about;
    this.receiversIds = receiversIds;
    this.receiversType = receiversType;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): NotificationModel {
    return new NotificationModel(
      json.id,
      json.title,
      json.description,
      json.header,
      json.image,
      json.about,
      json.receiversIds,
      json.receiversType,
      json.createdAt
    );
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      header: this.header,
      image: this.image,
      about: this.about,
      receiversIds: this.receiversIds,
      receiversType: this.receiversType,
      createdAt: this.createdAt,
    };
  }
}
