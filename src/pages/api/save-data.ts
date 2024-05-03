import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../api/pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { info } = req.body;

      const finalInfo = JSON.stringify(info);

      const result = await pool.query(
        "INSERT INTO data (info) VALUES ($1) RETURNING *",
        [finalInfo]
      );

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
