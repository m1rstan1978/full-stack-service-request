import { Request } from "@/server/db/association/userRequest";
import { Op, fn } from "sequelize";
import { useSequalizeError } from "~/server/utils/sequalizeError";

export default defineEventHandler(async event => {
  const { page: pageQuery, pagesize: pageSizeQuery } = getQuery(event);
  const querySearch = [
    {
      name: "search",
      key: "textarea",
    },
    {
      name: "house",
      key: "house",
    },
  ];

  const querySearchObj = {};
  Object.entries(getQuery(event)).forEach(([key, value]) => {
    const findSearchQuery = querySearch.find(el => el.name === key);
    if (!!findSearchQuery) {
      querySearchObj[findSearchQuery.key] = {
        [Op.iLike]: fn("LOWER", `${value.toLowerCase()}%`),
      };
    }
  });

  const page = parseInt(pageQuery) || 1;
  const pageSize = parseInt(pageSizeQuery) || 6;

  const attributesKey = [
    "id",
    "created",
    "house",
    "flat",
    "deadline",
    "surname",
    "first_name",
    "middle_name",
    "phone",
    "textarea",
  ];

  try {
    const foundRequests = await Request.findAll({
      where: querySearchObj,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      attributes: attributesKey,
      raw: true,
    });

    const totalCount = await Request.count({
      where: querySearchObj,
    });

    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalCount);

    const recordInfo = `${startIndex}–${endIndex}`;

    return {
      totalPages: Math.ceil(totalCount / pageSize),
      requests: foundRequests,
      totalCount,
      recordInfo,
      startIndex,
    };
  } catch (e) {
    const { message, statusCode } = useSequalizeError(e, e.statusCode);
    return createError({ statusCode, message });
  }
});
