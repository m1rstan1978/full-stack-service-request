//Предназначен для расширения

// import { User } from "@/server/db/association/userRequest";
// import { useCreateCookie } from "@/server/utils/cookie";
// import Token from "~/server/db/models/token";
// import { useCreateTokens } from "~/server/utils/jwt";
// import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  return "";
  // const { username, password } = await readBody(event);

  // const findUser = await User.findOne({
  //   where: { username: username },
  //   raw: true,
  // });

  // if (findUser) {
  //   throw createError({
  //     statusCode: 400,
  //     message: "Пользователь с таким именем уже существует",
  //   });
  // }

  // try {
  //   const user = await User.create({ username, password });
  //   const payload = { id: user.id };

  //   const { refreshToken, accessToken } = useCreateTokens(payload);

  //   if (!refreshToken || !accessToken) {
  //     throw createError({
  //       statusCode: 400,
  //       message: "Ошибка регистрации пользователя",
  //     });
  //   }

  //   await Token.create({ refresh_token: refreshToken, user_id: user.id });

  //   const maxAgeRefreshToken = 30 * 24 * 60 * 60 * 1000;
  //   useCreateCookie(event, "refresh_token", refreshToken, maxAgeRefreshToken);

  //   return {
  //     accessToken: accessToken,
  //   };
  // } catch (e) {
  //   const { message, statusCode } = useSequalizeError(e, e.statusCode);
  //   throw createError({ statusCode, message });
  // }
});
