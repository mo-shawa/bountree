type Props = {
	children: React.ReactNode
	setModalOpen: (open: boolean) => void
	classes?: string
}
export default function GenericModal({
	children,
	setModalOpen,
	classes,
}: Props) {
	const handleOnClose = (
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => {
		e.preventDefault()
		e.stopPropagation()
		setModalOpen(false)
	}

	return (
		<div className="fixed z-20 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div
						onClick={handleOnClose}
						className="absolute inset-0 backdrop-blur-md  flex items-center justify-center p-4"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className={classes || "max-w-7xl"}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
