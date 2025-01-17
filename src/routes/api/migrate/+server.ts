import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db.server.js';
import { todos } from '../../../db/schema';
import type { InferSelectModel } from 'drizzle-orm';

export async function POST({ request, locals }) {
  const session = await locals.auth();
  const userId = session?.user.id;
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const localTodos: InferSelectModel<typeof todos>[] = await request.json();

  try {
    // Insert all todos, setting the ownerId to the current user
    await db.insert(todos).values(
      localTodos.map(todo => ({
        ...todo,
        id: undefined, // Let the database assign new IDs
        ownerId: userId,
        created_at: new Date(todo.created_at),
        updated_at: new Date(todo.updated_at),
        deleted_at: todo.deleted_at ? new Date(todo.deleted_at) : null
      }))
    );

    return json({ success: true });
  } catch (error) {
    console.error('Error migrating todos:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}