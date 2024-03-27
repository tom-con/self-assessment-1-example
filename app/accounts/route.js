import knex from "../database";

export async function GET(req) {
	const { searchParams } = req.nextUrl
	const accountNumber = searchParams.get('accountNumber');
	let query = knex('accounts')

	if (accountNumber) query = query.where('account_number', accountNumber)

	const result = await query.select('*')

	return Response.json({ data: result })
}