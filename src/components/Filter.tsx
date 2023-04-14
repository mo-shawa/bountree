import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { classNames } from '@/utils'

export default function Filter({ filteredBy, setFilteredBy }: FilterProps) {
	return (
		<div className="bg-b-blue-dark  mx-auto w-full max-w-5xl p-10 gap-5 grid md:grid-cols-6 grid-cols-3">
			<Icon
				src="/static/svg/all-roles.svg"
				filter={() => setFilteredBy('All roles')}
				text="All roles"
				filteredBy={filteredBy}
			/>
			<Icon
				src="/static/svg/engineering.svg"
				filter={() => setFilteredBy('Engineering')}
				text="Engineering"
				filteredBy={filteredBy}
			/>
			<Icon
				src="/static/svg/design.svg"
				filter={() => setFilteredBy('Product')}
				text="Product"
				filteredBy={filteredBy}
			/>
			<Icon
				src="/static/svg/marketing.svg"
				filter={() => setFilteredBy('Marketing')}
				text="Marketing"
				filteredBy={filteredBy}
			/>
			<Icon
				src="/static/svg/operations.svg"
				filter={() => setFilteredBy('Operations')}
				text="Operations"
				filteredBy={filteredBy}
			/>
			<Icon
				src="/static/svg/legal.svg"
				filter={() => setFilteredBy('Legal')}
				text="Legal"
				filteredBy={filteredBy}
			/>
		</div>
	)
}

type FilterProps = {
	setFilteredBy: Dispatch<SetStateAction<string>>
	filteredBy: string
}

function Icon(props: IconProps) {
	return (
		<div
			className={classNames(
				props.filteredBy === props.text ? 'bg-b-yellow/20' : '',
				'text-white cursor-pointer flex flex-col justify-center items-center rounded-md py-5 hover:bg-white/10 transition-colors'
			)}
			onClick={props.filter}
		>
			<Image
				src={props.src}
				alt=""
				height={28}
				width={28}
				className="mb-3"
			/>
			<p>{props.text}</p>
		</div>
	)
}

type IconProps = {
	src: string
	filter: () => void
	text: string
	filteredBy: null | string
}
