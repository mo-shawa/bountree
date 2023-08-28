export default function Floaters() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute -left-4 top-10 h-72 w-72 animate-floater rounded-full bg-purple-300 mix-blend-normal blur-3xl  filter "></div>
      <div className="animation-delay-2000 absolute -right-4 top-10 h-72 w-72 animate-floater rounded-full bg-yellow-300 mix-blend-normal  blur-3xl filter"></div>
      <div className="animation-delay-4000 absolute left-20 top-40 h-72 w-72 animate-floater rounded-full bg-pink-300 mix-blend-normal  blur-3xl filter"></div>
    </div>
  )
}
