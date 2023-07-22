import Image from 'next/image'
export default function Banner() {
	return (
		<div className="block w-full h-[800px]">
			<Image src="/banner.jpeg" alt="Marine Serre" width="2000" height="2500" className="h-auto object-cover sm:hidden"/>
			<video autoPlay={'autoplay'} muted playsInline loop width='100%' className="md:block md:w-full hidden">
				<source src="/prada.mp4" type='video/mp4'/>
			</video>
		</div>
	)
}