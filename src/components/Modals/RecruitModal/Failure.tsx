type Props = {
  handleOnClose: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => void
  message?: string
}

export default function Failure({ handleOnClose, message }: Props) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center rounded bg-white px-5 py-10 text-black">
      <h1 className="mb-4 text-2xl font-bold">Error</h1>
      <p className="mb-4 text-center">
        There was an error submitting your candidate.
      </p>
      {message && <p className="text-center text-red-500">{message}</p>}
      <button
        onClick={handleOnClose}
        className="btn mt-4 bg-b-yellow text-black hover:bg-b-blue-dark hover:text-white"
      >
        Ok
      </button>
    </div>
  )
}
