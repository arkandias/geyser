import coordinations from "./coordinations.ts";
import courses from "./courses.ts";
import data from "./data.ts";
import general from "./general.ts";
import organizations from "./organizations.ts";
import requests from "./requests.ts";
import services from "./services.ts";
import teachers from "./teachers.ts";

export default {
  admin: {
    ...data,
    ...general,
    ...teachers,
    ...services,
    ...courses,
    ...requests,
    ...coordinations,
    ...organizations,
  },
} as const;
