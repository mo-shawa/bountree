export default function Floaters() {
	return (
		<div className="sm:overflow-x-hidden">
			<div className="absolute top-0 -left-4 w-72 h-72 rounded-full bg-purple-300 mix-blend-normal filter blur-3xl  animate-floater z-0"></div>
			<div className="absolute top-0 -right-4 w-72 h-72 rounded-full bg-yellow-300 mix-blend-normal filter blur-3xl  animate-floater animation-delay-2000 z-0"></div>
			<div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full bg-pink-300 mix-blend-normal filter blur-3xl  animate-floater animation-delay-4000 z-0"></div>
		</div>
	)
}
