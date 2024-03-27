"use client"

import { useState } from "react";

export default function Home() {
	const [amount, setAmount] = useState(0);
	const [receiverAccNum, setReceiverAccNum] = useState("");
	const [senderAccNum, setSenderAccNum] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	async function transfer() {
		setMessage("")
		setError("")
		const response = await fetch(`/accounts/transfer`, {
			method: `PUT`,
			body: JSON.stringify({
				amount,
				receiverAccNum,
				senderAccNum,
			})
		})

		if (!response.ok) {
			const err = await response.text()
			setError(err)
			return
		}

		const result = await response.json()
		setMessage(result.message)
	}

	return (
		<div className="flex flex-col mt-12 gap-y-4 mx-auto w-1/3">
			<input
				className="rounded-md text-black border-2 focus:border-indigo-600"
				onChange={(event) => setSenderAccNum(event.target.value)}
				value={senderAccNum}
				maxLength={5}
				minLength={5}
			/>
			<input
				className="rounded-md text-black border-2 focus:border-indigo-600"
				onChange={(event) => setReceiverAccNum(event.target.value)}
				value={receiverAccNum}
				maxLength={5}
				minLength={5}
			/>
			<input
				className="rounded-md text-black border-2 focus:border-indigo-600"
				onChange={(event) => setAmount(parseFloat(event.target.value))}
				value={amount}
			/>
			<button
				className="bg-indigo-500 text-white rounded-md p-2"
				onClick={transfer}
			>
				Transfer
			</button>
			<div>
				{message && <p className="text-xl text-green-500">{message}</p>}
				{error && <p className="text-xl text-red-500">{error}</p>}
			</div>
		</div>
	);
}
