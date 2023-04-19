import { useState, useEffect } from "react"
import Opportunity from "./Opportunity"
import Filter from "./Filter"
import IOpportunity from "@/types/Opportunity"
import { Loader } from "./Loader/Loader"
import { formatCurrency } from "@/utils"

type OpportunitiesProps = {
	data: IOpportunity[]
}

export default function Opportunities({ data }: OpportunitiesProps) {
	const [filteredData, setFilteredData] = useState<IOpportunity[]>(data)
	const [filteredBy, setFilteredBy] = useState<string>("All roles")

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	useEffect(() => {
		if (filteredBy === "All roles") setFilteredData(data)

		if (filteredBy !== "All roles") {
			const dataCopy = structuredClone(data)

			const filteredData = dataCopy.filter(
				(element: any) => element.category === filteredBy
			)
			setFilteredData(() => filteredData)
		}
	}, [filteredBy, data])

	if (!data) return <Loader />

	return (
		<>
			<section className="bg-b-blue-dark">
				<div className="mx-auto px-4 w-full max-w-7xl">
					<Filter filteredBy={filteredBy} setFilteredBy={setFilteredBy} />
					{filteredData && filteredData.length ? (
						filteredData.map((item) => (
							<Opportunity
								id={item._id}
								key={item._id}
								company={item.company.name}
								image={item.company.image}
								slogan={item.company.slogan}
								role={{
									title: item.title,
									category: item.category,
									workFrom: item.remote ? "Remote" : "In person",
									location: item.location,
									reward: formatCurrency(
										item.reward.amount,
										item.reward.currency
									),
								}}
								salary={item.salary}
								status={item.status}
							/>
						))
					) : (
						<div className="w-full bg-white rounded-md flex flex-row justify-between items-center p-4 my-4">
							<h1 className="text-xl mx-auto">
								No opportunities match the given filter
							</h1>
						</div>
					)}
				</div>
			</section>
		</>
	)
}
