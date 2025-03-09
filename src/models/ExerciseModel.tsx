import {SessionModel} from "./SessionModel";

import type {ExerciseProps} from "../sections/Exercises/exercise-table-row";

export class ExerciseModel {
  id: number;

  name: string;

  description: string;

  image?: string;

  durationInMinutes: number;

  video?: string;

  calorie: number;

  level?: string;

  muscles?: string;

  tags?: string;

  session: SessionModel

  repeatNumber?: string;

  available: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    durationInMinutes: number,
    calorie: number,
    session: SessionModel,
    available: boolean,
    image?: string,
    video?: string,
    level?: string,
    muscles?: string,
    tags?: string,
    repeatNumber?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.durationInMinutes = durationInMinutes;
    this.calorie = calorie;
    this.session = session;
    this.available = available;
    this.image = image;
    this.video = video;
    this.level = level;
    this.muscles = muscles;
    this.tags = tags;
    this.repeatNumber = repeatNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): ExerciseModel {
    return new ExerciseModel(
      json.id,
      json.name,
      json.description,
      json.durationInMinutes,
      json.calorie,
      SessionModel.fromJson(json.session),
      json.available,
      json.image ?? undefined,
      json.video ?? undefined,
      json.level ?? undefined,
      json.muscles ?? undefined,
      json.tags ?? undefined,
      json.repeatNumber ?? undefined,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      durationInMinutes: this.durationInMinutes,
      video: this.video,
      calorie: this.calorie,
      level: this.level,
      muscles: this.muscles,
      tags: this.tags,
      session: this.session.toJson(),
      repeatNumber: this.repeatNumber,
      available: this.available,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }


  toExerciseProps(): ExerciseProps {
    return {


      id: this.id,
      name: this.name,
      durationInMinutes: this.durationInMinutes,
      level: this.level,
      muscles: this.muscles,
      tags: this.tags,
      session: this.session,
      repeatNumber: this.repeatNumber,
      image:( this.image)?this.image:'https://example.com/avatar.jpg',
      description: this.description,
      available: this.available,
      calorie: this.calorie
    };
  }
}
