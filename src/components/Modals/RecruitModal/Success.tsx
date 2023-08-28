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
    <div className="mx-4 flex w-full max-w-sm flex-col items-center rounded bg-white px-5 py-10 text-black">
      <h1 className="mb-4 text-2xl font-bold">Success!</h1>
      <p className="mb-4 text-center">
        {applicationsRemaining
          ? `Your candidate has been submitted. You can submit
    ${applicationsRemaining} more candidate(s) to this position.`
          : `Your candidate has been submitted. You cannot submit any more candidates to this position.`}
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
