import type { NextApiRequest, NextApiResponse } from "next";
import { graphql } from "graphql";

import { schema, resolvers } from "../../src/lib/graphql";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { body } = req;
    const response = await graphql(schema, body.query, resolvers);
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.status(500).send(e);
  }
};
