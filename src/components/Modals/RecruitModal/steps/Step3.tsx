import { classNames } from "@/utils/misc"

type Props = {
  checkedState: boolean[]
  handleCheckboxChange: (index: number) => void
  name: string
}

export default function Step3({
  checkedState,
  handleCheckboxChange,
  name,
}: Props) {
  return (
    <>
      <h1 className="text-2xl">✋ Wait a minute ✋</h1>

      <div className="alert alert-warning my-8 items-start rounded-md shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-left">
            Ensure {name} is aware of your referral!
          </span>
        </div>
      </div>
      <label
        className={classNames(
          checkedState[0]
            ? "border-success bg-green-300"
            : "border-error  bg-red-300",
          "label cursor-pointer rounded-md  border-2  px-4 shadow transition-colors "
        )}
      >
        <input
          checked={checkedState[0]}
          type="checkbox"
          required
          className="checkbox checkbox-lg mr-4"
          onChange={() => handleCheckboxChange(0)}
        />
        <span className="text-md label-text text-left">
          I confirm that {name} is fully aware I am recommending them for this
          position.
        </span>
      </label>
    </>
  )
}
