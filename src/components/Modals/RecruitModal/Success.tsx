type Props = {
	applicationsRemaining: number
	handleOnClose: (
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void
}

export default function Success({
	applicationsRemaining,
	handleOnClose,
}: Props) {
	return (
		<div className="mx-4 text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-4">Success!</h1>
			<p className="text-center mb-4">
				{applicationsRemaining
					? `Your candidate has been submitted. You can submit
    ${applicationsRemaining} more candidate(s) to this position.`
					: `Your candidate has been submitted. You can not submit any more candidates to this position.`}
			</p>
			<button
				onClick={handleOnClose}
				className="btn bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
			>
				Great!
			</button>
		</div>
	)
}
