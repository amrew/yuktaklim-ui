import { createClient } from "@supabase/supabase-js";
import { getSession } from "./session.server";

const supabaseUrl = "https://ayvjlavxfxyeqlswrano.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey!);

export const getAuth = async ({ request }: { request: Request }) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (session.has("access_token")) {
      const userSession = supabase.auth.setAuth(session.get("access_token"));
      return {
        userSession,
        isLoggedIn: !!userSession,
      };
    }
  } catch (err) {
    /** ignore */
  }
};

export const hasAuthSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("access_token")) {
    throw Error("No session");
  } else {
    return supabase.auth.setAuth(session.get("access_token"));
  }
};
