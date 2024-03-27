import knex from "../../database";

export async function PUT(req) {
	const { amount, receiverAccNum, senderAccNum } = await req.json();

	const sender = await knex('accounts')
		.where('account_number', senderAccNum)
		.first('*')

	if (!sender) {
		return new Response(`User not found with account number ${senderAccNum}`, { status: 404 })
	}

	if (sender.balance < amount) {
		return new Response(`Insufficient balance`, { status: 400 })
	}

	const receiver = await knex('accounts')
		.where('account_number', receiverAccNum)
		.first('*')

	if (!receiver) {
		return new Response(`User not found with account number ${receiverAccNum}`, { status: 404 })
	}

	const newSenderBalance = sender.balance - amount
	const newReceiverBalance = receiver.balance + amount

	await knex('accounts')
		.where('account_number', senderAccNum)
		.update({ balance: newSenderBalance })

	await knex('accounts')
		.where('account_number', receiverAccNum)
		.update({ balance: newReceiverBalance })

	return Response.json({ message: 'Transfer successful' })
}