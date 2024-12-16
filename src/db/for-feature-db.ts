// src/db/for-feature.db.ts
import { User, UserSchema } from "src/module/user/user.schema";

export default [
    { name: User.name, schema: UserSchema },
];
