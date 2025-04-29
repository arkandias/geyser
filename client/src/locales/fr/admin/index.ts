import coordinations from "./coordinations.ts";
import courses from "./courses.ts";
import data from "./data.ts";
import general from "./general.ts";
import requests from "./requests.ts";
import teachers from "./teachers.ts";

export default {
  admin: {
    ...data,
    ...general,
    ...teachers,
    ...courses,
    ...requests,
    ...coordinations,
  },
} as const;
