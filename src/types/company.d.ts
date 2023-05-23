export default interface ICompany {
	name: string
	about: string
	url: string
	image: string
	founded: string
	industry?: string
	employees?: string
	stage:
		| 'preseed'
		| 'seed'
		| 'A'
		| 'B'
		| 'C'
		| 'D'
		| 'E'
		| 'F'
		| 'IPO'
		| 'acquired'
		| 'growth'
}
