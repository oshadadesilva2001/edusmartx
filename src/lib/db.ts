import { createPool } from "mariadb";

const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "irwtn",
  password: process.env.DB_PASSWORD || "DeadReckoning@2023",
  database: process.env.DB_NAME || "edusmartx_db",
  connectionLimit: 10,
});

interface OkPacket {
  affectedRows: number;
  insertId: number | bigint;
  warningStatus: number;
}

export async function query<T>(
  sql: string,
  params?: (string | number)[]
): Promise<T[]> {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(sql, params);
    return rows as T[];
  } finally {
    conn.release();
  }
}

export async function execute(
  sql: string,
  params?: (string | number)[]
): Promise<OkPacket> {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(sql, params);
    return result as unknown as OkPacket;
  } finally {
    conn.release();
  }
}

export default pool;
