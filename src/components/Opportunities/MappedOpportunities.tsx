import { useState, useEffect } from "react"
import OpportunityCard from "./OpportunityCard"
import Filter from "./Filter"
import { Opportunity } from "@/types/opportunity"
import { formatCurrency } from "@/utils/misc"

type OpportunitiesProps = {
  data: Opportunity[]
}

export default function MappedOpportunities({ data }: OpportunitiesProps) {
  const [filteredData, setFilteredData] = useState<Opportunity[]>()
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
      setFilteredData(() => {
        return filteredData
      })
    }
  }, [filteredBy, data])

  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4">
          <Filter filteredBy={filteredBy} setFilteredBy={setFilteredBy} />
          {filteredData && filteredData.length ? (
            filteredData.map((opportunity) => (
              <OpportunityCard opportunity={opportunity} key={opportunity.id} />
            ))
          ) : (
            <div className="my-4 flex w-full flex-row items-center justify-between rounded-md bg-white p-4">
              <h1 className="mx-auto text-xl">
                No opportunities match the given filter
              </h1>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
