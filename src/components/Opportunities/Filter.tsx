import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { classNames } from '@/utils/misc'
import {
	GlobeAltIcon,
	CommandLineIcon,
	PaintBrushIcon,
	PresentationChartLineIcon,
	WrenchScrewdriverIcon,
	ScaleIcon,
} from '@heroicons/react/24/outline'

type FilterProps = {
	setFilteredBy: Dispatch<SetStateAction<string>>
	filteredBy: string
}


type FilterIconProps = {
	src?: string
	icon?: JSX.Element
	filter: () => void
	text: string
	filteredBy: string
}

const iconProps = {
	className: 'h-7 w-7 mb-3 text-gray-700',
}


export default function Filter({ filteredBy, setFilteredBy }: FilterProps) {
	return (
		<div className='overflow-x-auto'>
			
			<div className="grid-cols-6 grid mx-auto min-w-max max-w-5xl p-10 gap-5 md:grid-cols-6 sm:grid-cols-3">
				<FilterIcon
					icon={<GlobeAltIcon {...iconProps} />}
					filter={() => setFilteredBy('All roles')}
					text="All roles"
					filteredBy={filteredBy}
				/>
				<FilterIcon
					icon={<CommandLineIcon {...iconProps} />}
					filter={() => setFilteredBy('Engineering')}
					text="Engineering"
					filteredBy={filteredBy}
				/>
				<FilterIcon
					icon={<PaintBrushIcon {...iconProps} />}
					filter={() => setFilteredBy('Product')}
					text="Product"
					filteredBy={filteredBy}
				/>
				<FilterIcon
					icon={<PresentationChartLineIcon {...iconProps} />}
					filter={() => setFilteredBy('Marketing')}
					text="Marketing"
					filteredBy={filteredBy}
				/>
				<FilterIcon
					icon={<WrenchScrewdriverIcon {...iconProps} />}
					filter={() => setFilteredBy('Operations')}
					text="Operations"
					filteredBy={filteredBy}
				/>
				<FilterIcon
					icon={<ScaleIcon {...iconProps} />}
					filter={() => setFilteredBy('Legal')}
					text="Legal"
					filteredBy={filteredBy}
				/>
			</div>
		</div>
)

function FilterIcon({ filter, filteredBy, text, icon }: FilterIconProps) {
	return (
		<div
			className={classNames(
				filteredBy === text ? 'bg-b-yellow/20' : 'bg-white',
				'shadow cursor-pointer flex flex-col justify-center items-center rounded-md py-4 px-1 min-w-max hover:bg-black/10 transition-colors'
			)}
			onClick={filter}
		>
			{icon}
			<p>{text}</p>
		</div>
	)
}
}