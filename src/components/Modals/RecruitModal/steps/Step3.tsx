import { classNames } from '@/utils/misc'

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

			<div className="alert alert-warning rounded-md shadow-lg my-8 items-start">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
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
						? 'border-success bg-green-300'
						: 'border-error  bg-red-300',
					'label border-2 cursor-pointer  rounded-md  px-4 transition-colors shadow '
				)}
			>
				<input
					checked={checkedState[0]}
					type="checkbox"
					required
					className="checkbox mr-4 checkbox-lg"
					onChange={() => handleCheckboxChange(0)}
				/>
				<span className="label-text text-left text-md">
					I confirm that {name} is fully aware I am recommending them for this
					position.
				</span>
			</label>
		</>
	)
}
