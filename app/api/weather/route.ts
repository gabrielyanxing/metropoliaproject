import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'Airport',
};

export async function GET() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM weather_data LIMIT 1');

        if (Array.isArray(rows) && rows.length > 0) {
            return NextResponse.json(rows[0]);
        } else {
            return NextResponse.json({ error: 'No weather data found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Database error:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown database error occurred' }, { status: 500 });
        }
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

