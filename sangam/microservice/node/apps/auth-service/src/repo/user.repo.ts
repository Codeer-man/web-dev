import { getPool } from "shared";
import { user, UserRole } from "../types/auth.type";

export const authRepo = {
  async createUser(input: {
    name: string;
    email: string;
    passwordHash: string;
    role?: UserRole;
  }): Promise<user> {
    const result = await getPool().query<user>(
      `
        INSERT INTO users (name,email,password_hash,role)    
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `,
      [input.name, input.email, input.passwordHash, input.role ?? "USER"],
    );
    return result.rows[0];
  },
  async findByEmail(email: string): Promise<user> {
    const result = await getPool().query<user>(
      `
        SELECT *
        FROM users
        WHERE email = $1
        `,
      [email],
    );
    return result.rows[0] ?? null;
  },
  async findById(userId: string) {
    const result = await getPool().query<user>(
      `
      SELECT * FROM users 
      WHERE id = $1
      `,
      [userId],
    );
    return result.rows[0] ?? null;
  },
};
