import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
let ids = [
  "1c325b65-0f3d-464e-8473-8026dcd86320",
  "aff16377-1c96-47a8-a93a-2a42d05fe02f",
  "9ab76dea-abf9-453e-9823-b5778976a92d",
  "b29d6121-0404-44e1-917e-37cad459178a",
  "865ded46-4a19-4e48-9993-eacd24b7276e",
  "43ca64bb-def7-4d02-a917-740ac8912586",
  "921bf17b-04bc-43c5-8e34-bf3d075c862f",
  "59440c86-756a-41ea-99cf-1c68284e6354",
  "6d3f0c02-831c-4ad2-8846-616443ba7691",
  "646310a5-7488-4af6-a20d-4c5b56d30608",
  "4b13c5ed-2591-4d19-a4ce-785a1b9ebafb",
  "49bba39f-eebb-43bc-8419-92dfc2ce1002",
  "a650ec51-b660-4f18-a1c6-06f2b7b7af73",
  "3da474d3-59d8-4ee6-959d-f9b2f51120ba",
  "66c11eb3-7568-43b0-a63a-020d8f80b636",
  "8036d925-8130-48bc-8e94-f5d1fa87e986",
  "4eb2b7f0-2464-40c4-9e59-d111bcf7e914",
  "bf79bdcc-ade1-44df-994b-49f7a6aed940",
  "8b30604b-030e-46e7-abf4-b7e2e9627a79",
  "a9dad897-9164-46e6-a35d-e3fb59fc099a",
  "1c4fbba2-3cc6-4ee9-ad02-bd11c210b453",
  "ae95234a-89b9-440a-898b-22741d64fa71",
  "cc99b3b5-1359-4156-b390-acd9dd0227bd",
  "f940d5ed-b153-4eec-ba68-a6fb26ffd902",
  "31ab269f-9284-4aa2-86db-09f84b673d3a",
];
let contacts = ids.map((x) => ({
  id: x,
  name: faker.name.findName(),
  date: faker.date.past(),
  image: faker.image.people(undefined,undefined,true),
  phone: faker.phone.number('+234 ### ### ####'),
  email: faker.internet.exampleEmail()
}));
class ContactService {
  getContacts() {
    return contacts;
  }
  getContact(id) {
    return contacts.find((contact) => contact.id === id);
  }
}
let contactService = new ContactService();
export { contactService };
