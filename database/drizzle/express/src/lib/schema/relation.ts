import { relations } from "drizzle-orm";
import {
  integer,
  interval,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

const userTable = pgTable(
  "user",
  {
    id: integer("_id").generatedAlwaysAsIdentity(),
    name: text("text"),
    invitedbt: integer("invited_by"),
  },
  (key) => ({
    pk: primaryKey({ columns: [key.id] }),
  })
);

//one to one relation in single column

// const inviteUserRelation = relations(userTable, ({ one }) => ({
//   invite: one(userTable, {
//     fields: [userTable.id],
//     references: [userTable.invitedbt],
//   }),
// }));

//one to one relarion in other table
const userProfileTable = pgTable("Profile", {
  userID: integer("user_id").references(() => userTable.id),
  profile: text(),
});

const userRelation = relations(userTable,({one})=> ({
    profile:one(userProfileTable,({
        fields:[userTable.id],
        references: [userProfileTable.userID]
    }))
}))

const profileRelation = relations(userProfileTable,({one})=>({
    user:one(userTable,({
        fields:[userProfileTable.userID],
        references:[userTable.id]
    }))
}))

