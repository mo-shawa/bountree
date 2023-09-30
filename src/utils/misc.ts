import { ApplicationStatus } from "@/types/application"
import { Opportunity } from "@/types/opportunity"

export function classNames(...className: string[]) {
  return className.filter(Boolean).join(" ")
}

export function formatCurrency(amount?: number, currency: string = "USD") {
  if (amount == null) return
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  })
}

export function getSalaryString(opportunity: Opportunity) {
  const { type, currency } = opportunity.salary
  let salary
  if (type === "fixed") {
    const fixed = opportunity?.salary.fixed
    salary = formatCurrency(fixed, currency)
  }

  if (type === "range") {
    const min = opportunity?.salary.min
    const max = opportunity?.salary.max
    salary = `${formatCurrency(min, currency)} - ${formatCurrency(
      max,
      currency
    )}`
  }

  return salary
}

export function isEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export function isURL(url: string) {
  return /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
    url
  )
}

export const statusStyle: { [key in ApplicationStatus]: string } = {
  pending: "bg-yellow-500",
  forwarded: "bg-orange-500",
  interviewing: "bg-blue-500",
  rejected: "bg-red-500",
  offered: "bg-purple-500",
  hired: "bg-green-500",
}

export function wait(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
