import { db } from "$lib/server/db.server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";
import Google from "@auth/sveltekit/providers/google";

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      id: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: DrizzleAdapter(db),
  providers: [Github, Google],
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    }
  }
});