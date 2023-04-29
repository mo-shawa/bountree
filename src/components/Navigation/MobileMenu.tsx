import { Disclosure } from "@headlessui/react"
import { classNames } from "@/utils/misc"
import Pill from "../Misc/Pill"
export default function MobileMenu(props: any) {
	{
		/* Mobile menu, show/hide based on menu open state. */
	}
	return (
		<Disclosure.Panel className="md:hidden">
			<div className="space-y-1 px-2 pb-3 pt-2">
				{props.navigation.map((item: any) => (
					<Disclosure.Button
						key={item.name}
						as="a"
						href={item.href}
						className={classNames(
							item.current
								? "bg-gray-900 text-white"
								: "text-gray-300 hover:bg-gray-700 hover:text-white",
							"block rounded-md px-3 py-2 text-base font-medium"
						)}
						aria-current={item.current ? "page" : undefined}
					>
						{item.name}

						{item.href === "#" && <Pill classes="ml-2">Soon</Pill>}
					</Disclosure.Button>
				))}
			</div>
		</Disclosure.Panel>
	)
}
