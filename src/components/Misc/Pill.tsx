import { classNames } from '@/utils/misc'

type PillProps = {
	children: React.ReactNode
	className?: string
	type?: PillColor
}

type PillColor =
	| 'red'
	| 'orange'
	| 'yellow'
	| 'green'
	| 'blue'
	| 'indigo'
	| 'purple'
	| 'pink'
	| 'gray'

type PillColorMap = {
	[key in PillColor]: string
}

const pillColors: PillColorMap = {
	blue: 'bg-blue-300 text-blue-800 border border-blue-800 shadow shadow-md shadow-blue-400/50',
	green:
		'bg-green-300 text-green-800 border border-green-800 shadow-md shadow-green-400/50',
	red: 'bg-red-300 text-red-800 border border-red-800 shadow-md shadow-red-400/50',
	yellow:
		'bg-yellow-300 text-yellow-800 border border-yellow-800 shadow-md shadow-yellow-400/50',
	orange:
		'bg-orange-300 text-orange-800 border border-orange-800 shadow-md shadow-orange-400/50',
	indigo:
		'bg-indigo-300 text-indigo-800 border border-indigo-800 shadow-md shadow-indigo-400/50',
	purple:
		'bg-purple-300 text-purple-800 border border-purple-800 shadow-md shadow-purple-400/50',
	pink: 'bg-pink-300 text-pink-800 border border-pink-800 shadow-md shadow-pink-400/50',
	gray: 'bg-gray-300 text-gray-800 border border-gray-800 shadow-md shadow-gray-400/50',
}

export default function Pill({
	children,
	type = 'blue',
	className,
}: PillProps) {
	return (
		<>
			<span
				className={classNames(
					'rounded-xl px-2 m-auto py-0.5 text-xs',
					pillColors[type],
					className ? className : ''
				)}
			>
				{children}
			</span>
		</>
	)
}
