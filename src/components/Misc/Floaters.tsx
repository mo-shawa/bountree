export default function Floaters() {
	return (
		<div className="absolute inset-0 overflow-hidden rounded-2xl">
			<div className="absolute top-10 -left-4 w-72 h-72 rounded-full bg-purple-300 mix-blend-normal filter blur-3xl  animate-floater "></div>
			<div className="absolute top-10 -right-4 w-72 h-72 rounded-full bg-yellow-300 mix-blend-normal filter blur-3xl  animate-floater animation-delay-2000"></div>
			<div className="absolute top-40 left-20 w-72 h-72 rounded-full bg-pink-300 mix-blend-normal filter blur-3xl  animate-floater animation-delay-4000"></div>
		</div>
	)
}
