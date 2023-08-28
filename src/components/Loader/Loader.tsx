import Layout from "../Layout/Layout"

type Props = {
  children?: React.ReactNode
  absolute?: boolean
}

export default function LoaderLayout({ children }: Props) {
  return (
    <Layout classNames="flex justify-center">
      <div
        className=" absolute left-1/2 top-1/2 my-4 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-between p-4
			"
      >
        <span className="loader"></span>
        {children}
      </div>
    </Layout>
  )
}

export function Loader({ children, absolute = true }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-between  ${
        absolute
          ? "absolute left-1/2 top-1/2 my-4 -translate-x-1/2 -translate-y-1/2 transform p-4"
          : ""
      }`}
    >
      <span className="loader"></span>
      {children}
    </div>
  )
}
