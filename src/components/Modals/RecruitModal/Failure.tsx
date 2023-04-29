type Props = {
	handleOnClose: (
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void
	message?: string
}

export default function Failure({ handleOnClose, message }: Props) {
	return (
		<div className="text-black bg-white px-5 py-10 rounded w-full max-w-sm flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-4">Error</h1>
			<p className="text-center mb-4">
				There was an error submitting your candidate. Please try again.
			</p>
			<button
				onClick={handleOnClose}
				className="btn bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
			>
				Ok
			</button>
			{message && <p className="text-center text-red-500 mt-4">{message}</p>}
		</div>
	)
}
