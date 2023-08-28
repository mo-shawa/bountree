import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"
import { classNames } from "@/utils/misc"
import {
  GlobeAltIcon,
  CommandLineIcon,
  PaintBrushIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline"

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
  className: "h-7 w-7 mb-3 text-gray-700",
}

export default function Filter({ filteredBy, setFilteredBy }: FilterProps) {
  return (
    <div className="overflow-x-auto">
      <div className="mx-auto grid min-w-max max-w-5xl grid-cols-6 gap-5 p-10 sm:grid-cols-3 md:grid-cols-6">
        <FilterIcon
          icon={<GlobeAltIcon {...iconProps} />}
          filter={() => setFilteredBy("All roles")}
          text="All roles"
          filteredBy={filteredBy}
        />
        <FilterIcon
          icon={<CommandLineIcon {...iconProps} />}
          filter={() => setFilteredBy("Engineering")}
          text="Engineering"
          filteredBy={filteredBy}
        />
        <FilterIcon
          icon={<PaintBrushIcon {...iconProps} />}
          filter={() => setFilteredBy("Product")}
          text="Product"
          filteredBy={filteredBy}
        />
        <FilterIcon
          icon={<PresentationChartLineIcon {...iconProps} />}
          filter={() => setFilteredBy("Marketing")}
          text="Marketing"
          filteredBy={filteredBy}
        />
        <FilterIcon
          icon={<WrenchScrewdriverIcon {...iconProps} />}
          filter={() => setFilteredBy("Operations")}
          text="Operations"
          filteredBy={filteredBy}
        />
        <FilterIcon
          icon={<ScaleIcon {...iconProps} />}
          filter={() => setFilteredBy("Legal")}
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
          filteredBy === text ? "bg-b-yellow/20" : "bg-white",
          "flex min-w-max cursor-pointer flex-col items-center justify-center rounded-md px-1 py-4 shadow transition-colors hover:bg-black/10"
        )}
        onClick={filter}
      >
        {icon}
        <p>{text}</p>
      </div>
    )
  }
}
