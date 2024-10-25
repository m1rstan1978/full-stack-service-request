import { useDecodePass } from "@/server/utils/hashPassword";
import Token from "~/server/db/models/token";
import User from "~/server/db/models/users";
import { useCreateTokens } from "~/server/utils/jwt";

export default defineEventHandler(async event => {
  const { username, password } = await readBody(event);

  const user = await User.findOne({
    where: {
      username: username,
    },
    attributes: ["id", "password"],
  });

  if (!user) {
    return createError({
      statusCode: 400,
      message: "Неправильное имя пользователя или пароль",
    });
  }

  const decodePassword = await useDecodePass(password, user?.password);
  if (!decodePassword) {
    return createError({
      statusCode: 400,
      message: "Неправильное имя пользователя или пароль",
    });
  }

  try {
    const payload = { id: user.id };
    const { refreshToken, accessToken } = useCreateTokens(payload);

    if (!refreshToken || !accessToken) {
      return createError({
        statusCode: 400,
        message: "Ошибка регистрации пользователя",
      });
    }

    await Token.destroy({ where: { user_id: user.id } });
    await Token.create({ refresh_token: refreshToken, user_id: user.id });

    return {
      refreshToken,
      accessToken,
    };
  } catch {
    return createError({
      statusCode: 500,
      message: "Ошибка сервера",
    });
  }
});
