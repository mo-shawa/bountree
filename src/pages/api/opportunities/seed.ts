import clientPromise from "../../../../db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import IOpportunity from "@/types/Opportunity"
import serverAuthenticate from "@/utils/serverAuthenticate"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await serverAuthenticate(req, res)

	const client = await clientPromise
	const db = client.db("bountree-dev")
	const collection = db.collection("opportunities")

	const opportunities: IOpportunity[] = [
		{
			title: "Senior Software Engineer",
			category: "Engineering",
			description:
				"We are looking for a Senior Software Engineer to join our team. You will be responsible for developing and implementing functional programs and applications. You will work with other engineers and developers to ensure the technical feasibility of UI/UX designs. You will also be responsible for developing and managing well-functioning databases and applications, as well as coding and documenting highly scalable software solutions. To be successful in this role, you should have experience with the full software development life cycle and software design. If you also have a talent for debugging and problem-solving, we’d like to meet you. Ultimately, you will build high-quality software that is aligned with our company needs.",
			status: "open",
			reward: {
				amount: 1000,
				currency: "USD",
			},
			salary: {
				min: 100000,
				max: 150000,
				currency: "USD",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			location: "San Francisco, CA",
			remote: false,
			company: {
				name: "Acme Inc.",
				url: "https://acme.com",
				image: "https://acme.com/logo.png",
				slogan: "We make things",
			},
			contact: {
				name: "John Doe",
				email: "j@doe.com",
				phone: "555-555-5555",
				image: "https://via.placeholder.com/80",
			},
			links: {
				apply: "https://acme.com/apply",
				website: "https://acme.com",
			},
			recruiters: [],
			perks: { description: "", items: [] },
			applyLink: "https://acme.com/apply",
			rejectionFeedback: [],
		},
		{
			title: "Junior Software Engineer",
			category: "Engineering",
			description:
				"We are looking for a Junior Software Engineer to join our team. You will be responsible for developing and implementing functional programs and applications. You will work with other engineers and developers to ensure the technical feasibility of UI/UX designs. You will also be responsible for developing and managing well-functioning databases and applications, as well as coding and documenting highly scalable software solutions. To be successful in this role, you should have experience with the full software development life cycle and software design. If you also have a talent for debugging and problem-solving, we’d like to meet you. Ultimately, you will build high-quality software that is aligned with our company needs.",
			status: "open",
			reward: {
				amount: 1000,
				currency: "USD",
			},
			salary: {
				min: 100000,
				max: 150000,
				currency: "USD",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			location: "San Francisco, CA",
			remote: false,
			company: {
				name: "GitHub",
				url: "https://github.com",
				image: "https://via.placeholder.com/80",
				slogan: "We make things",
			},
			contact: {
				name: "John Doe",
				email: "jogn@do.com",
				phone: "555-555-5555",
				image: "https://via.placeholder.com/80",
			},
			links: {
				apply: "https://acme.com/apply",
				website: "https://acme.com",
			},
			recruiters: [],
			perks: { description: "", items: [] },
			applyLink: "https://acme.com/apply",
			rejectionFeedback: [],
		},
		{
			title: "Marketing Manager",
			category: "Marketing",
			description:
				"We are looking for a Marketing Manager to join our team. You will be responsible for developing and implementing functional programs and applications. You will work with other engineers and developers to ensure the technical feasibility of UI/UX designs. You will also be responsible for developing and managing well-functioning databases and applications, as well as coding and documenting highly scalable software solutions. To be successful in this role, you should have experience with the full software development life cycle and software design. If you also have a talent for debugging and problem-solving, we’d like to meet you. Ultimately, you will build high-quality software that is aligned with our company needs.",
			status: "open",
			reward: {
				amount: 1000,
				currency: "USD",
			},
			salary: {
				min: 100000,
				max: 150000,
				currency: "USD",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			location: "San Francisco, CA",
			remote: false,
			company: {
				name: "GitHub",
				url: "https://github.com",
				image: "https://via.placeholder.com/80",
				slogan: "We make things",
			},
			contact: {
				name: "John Doe",
				email: "Jornathan@doe.com",
				phone: "555-555-5555",
				image: "https://via.placeholder.com/80",
			},
			links: {
				apply: "https://acme.com/apply",
				website: "https://acme.com",
			},
			recruiters: [],
			perks: { description: "", items: [] },
			applyLink: "https://acme.com/apply",
			rejectionFeedback: [],
		},
	]
	const data = await collection.insertMany(opportunities)

	res.status(200).json({ data })
}
