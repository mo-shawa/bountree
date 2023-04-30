import IUser from "@/types/User"
import mail from "@sendgrid/mail"

export async function sendWelcomeEmail(user: IUser) {
	mail.setApiKey(process.env.SENDGRID_API_KEY as string)

	const res = await mail.send({
		to: user.email as string,
		from: {
			email: "team@bountree.app",
			name: "Bountree Team",
		},
		templateId: "d-94b91ccaef1f4c378770b5e0c9dc7b37",
		dynamicTemplateData: {
			userName: user.name,
		},
	})

	return res
}

export async function sendJobGeneratorEmail(
	email: string,
	jobDescription: string
) {
	mail.setApiKey(process.env.SENDGRID_API_KEY as string)

	const res = await mail.send({
		to: email as string,
		from: {
			email: "team@bountree.app",
			name: "Bountree Team",
		},
		templateId: "d-cf97be5320d643ae8795bfca86346758",
		dynamicTemplateData: {
			jobDescription,
		},
	})
}

type CandidateUpdateOptions = {
	userName: string
	userEmail: string
	candidateName: string
	positionName: string
	startupName: string
	status: "interviewing" | "rejected" | "hired"
	reason?: string
}

export async function sendCandidateUpdateEmail({
	userName,
	userEmail,
	candidateName,
	positionName,
	startupName,
	status,
	reason,
}: CandidateUpdateOptions) {
	mail.setApiKey(process.env.SENDGRID_API_KEY as string)

	const templateIdFromStatus = {
		interviewing: "d-22acb8af616a444f8a34f048bf7a5b0a",
		rejected: "d-2ef64620733f4cc8be9d37cac9ac05ed",
		hired: "d-3aad7ffed48249dd98a661d993d32f91",
	}

	const res = await mail.send({
		to: userEmail,
		from: {
			email: "team@bountree.app",
			name: "Bountree Team",
		},
		templateId: templateIdFromStatus[status],
		dynamicTemplateData: {
			userName,
			candidateName,
			positionName,
			startupName,
			...(reason && status === "rejected" ? { reason } : {}),
		},
	})

	return res
}
