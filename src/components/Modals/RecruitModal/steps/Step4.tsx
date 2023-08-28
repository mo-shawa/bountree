type Props = {
  checkedState: boolean[]
  requirements: string[]
  handleCheckboxChange: (index: number) => void
  name: string
}

export default function Step4({
  checkedState,
  requirements,
  handleCheckboxChange,
  name,
}: Props) {
  return (
    <>
      <h1 className="mb-4 text-center text-2xl">One last thing..</h1>
      <div className="form-control w-full text-left">
        <h2 className="mb-2">
          Please confirm that {name}{" "}
          <span className=" font-bold italic underline decoration-red-500 ">
            definitely
          </span>{" "}
          meets the following requirements:
        </h2>
        {requirements.map((requirement, index) => (
          <label
            key={requirement}
            className="label cursor-pointer justify-start px-4"
          >
            <input
              autoFocus={index === 0}
              checked={checkedState[index + 1]}
              type="checkbox"
              className="checkbox mr-4"
              onChange={() => handleCheckboxChange(index + 1)}
            />
            <span className="label-text text-left">{requirement}</span>
          </label>
        ))}
      </div>
    </>
  )
}
