"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const userTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.integer)("_id").generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.text)("text"),
    invitedbt: (0, pg_core_1.integer)("invited_by"),
}, (key) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [key.id] }),
}));
//one to one relation in single column
const inviteUserRelation = (0, drizzle_orm_1.relations)(userTable, ({ one }) => ({
    invite: one(userTable, {
        fields: [userTable.id],
        references: [userTable.invitedbt],
    }),
}));
//one to one relarion in other table
const userProfileTable = (0, pg_core_1.pgTable)("Profile", {
    userID: (0, pg_core_1.integer)("user_id").references(() => userTable.id),
    profile: (0, pg_core_1.text)(),
});
const userRelation = (0, drizzle_orm_1.relations)(userTable, ({ one }) => ({
    profile: one(userProfileTable, ({
        fields: [userTable.id],
        references: [userProfileTable.userID]
    }))
}));
const profileRelation = (0, drizzle_orm_1.relations)(userProfileTable, ({ one }) => ({
    user: one(userTable, ({
        fields: [userProfileTable.userID],
        references: [userTable.id]
    }))
}));
