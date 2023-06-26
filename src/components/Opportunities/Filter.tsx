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

export default function Filter({ filteredBy, setFilteredBy }: FilterProps) {
	return (
		<>
			<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] z-10 xs:hidden ">
				<div
					tabIndex={0}
					className="collapse rounded-lg shadow-md p-4 my-4 collapse-arrow bg-gray-100"
				>
					<div className="collapse-title text-2xl">Filter</div>
					<div className="collapse-content">
						<div className="grid mx-auto w-full max-w-5xl p-10 gap-5 grid-cols-2">
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
				</div>
			</div>
			<div className="hidden xs:grid mx-auto w-full max-w-5xl p-10 gap-5 md:grid-cols-6 grid-cols-3">
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
		</>
	)
}

type FilterProps = {
	setFilteredBy: Dispatch<SetStateAction<string>>
	filteredBy: string
}

function FilterIcon({ filter, filteredBy, text, icon }: FilterIconProps) {
	return (
		<div
			className={classNames(
				filteredBy === text ? 'bg-b-yellow/20' : 'bg-white',
				'shadow cursor-pointer flex flex-col justify-center items-center rounded-md py-5 hover:bg-black/10 transition-colors'
			)}
			onClick={filter}
		>
			{icon}
			<p>{text}</p>
		</div>
	)
}

type FilterIconProps = {
	src?: string
	icon?: JSX.Element
	filter: () => void
	text: string
	filteredBy: string
}

const iconProps = {
	height: 28,
	width: 28,
	className: 'mb-3 text-gray-700',
}
