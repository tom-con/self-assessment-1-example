import knex from "../../database";

export async function GET(req, { params }) {
	const result = await knex('accounts')
		.where('account_number', params.accountNumber)
		.select('*')

	return Response.json({ data: result });
}


export async function PUT(req, { params }) {
	const { changeAmount } = await req.json();

	const [foundUser] = await knex('accounts')
		.where('account_number', params.accountNumber)
		.select('*')

	if (!foundUser) {
		return new Response(`User not found with account number ${params.accountNumber}`, { status: 404 })
	}

	const newBalance = foundUser.balance + changeAmount

	const [updatedUser] = await knex('accounts')
		.where('account_number', params.accountNumber)
		.update({ balance: newBalance })
		.returning('*')

	return Response.json({ data: updatedUser })
}