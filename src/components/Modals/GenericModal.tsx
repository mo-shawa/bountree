type Props = {
  children: React.ReactNode
  setModalOpen: (open: boolean) => void
  className?: string
}
export default function GenericModal({
  children,
  setModalOpen,
  className,
}: Props) {
  const handleOnClose = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setModalOpen(false)
  }

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            onClick={handleOnClose}
            className="absolute inset-0 flex  items-center justify-center p-4 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={className || "max-w-7xl"}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
