
"use server"

import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function syncUserToDatabase(userData) {
  if (!userData?.email) return { success: false, error: "No email provided" };

  try {
    const result = await db.select().from(Users)
      .where(eq(Users.email, userData.email));

    if (result.length === 0) {
      await db.insert(Users).values({
        name: userData.name,
        email: userData.email,
        imageUrl: userData.imageUrl,
      });
      return { success: true, message: "User created" };
    }

    return { success: true, message: "User already exists" };
  } catch (error) {
    console.error("Database sync error:", error);
    return { success: false, error: error.message };
  }
}