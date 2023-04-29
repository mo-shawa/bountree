export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

export function formatCurrency(amount?: number, currency: string = "USD") {
	if (amount == null) return
	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: currency,
		maximumFractionDigits: 0,
	})
}

export function isEmail(email: string) {
	return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export function isURL(url: string) {
	return /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
		url
	)
}
