import { createCookieSessionStorage } from "remix";

//
// lifted directly from the remix documentation
// https://remix.run/docs/en/v1/api/remix#sessions
//

const expiredTime = 60 * 60;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "yuktaklim",
      // all of these are optional
      expires: new Date(Date.now() + expiredTime),
      httpOnly: true,
      maxAge: expiredTime,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET!],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
