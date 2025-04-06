export enum ApplicationReceivers {
  ALL,
  USER,
  GYM,
  MEMBERSHIP,
  NO_ONE,
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

  constructor({
                id,
                title,
                description,
                header,
                image = undefined,
                about = undefined,
                receiversIds = undefined,
                receiversType = ApplicationReceivers.ALL,
                createdAt = new Date().toISOString(),
              }: {
    id: number;
    title: string;
    description: string;
    header: string;
    image?: string;
    about?: string;
    receiversIds?: string;
    receiversType?: ApplicationReceivers;
    createdAt?: string;
  }) {
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
    return new NotificationModel({
      id: json.id,
      title: json.title,
      description: json.description,
      header: json.header,
      image: json.image,
      about: json.about,
      receiversIds: json.receiversIds,
      receiversType: json.receiversType,
      createdAt: json.createdAt,
    });
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
