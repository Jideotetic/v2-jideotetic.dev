import { Link } from "react-router";

interface NavProps {
	close?: () => void;
}

const NAV_LINKS = [
	{ title: "About", href: "#about" },
	{ title: "Latest Projects", href: "#latest-projects" },
	{ title: "Contact", href: "#contact" },
];

export default function Nav({ close }: NavProps) {
	return (
		<nav className="md:flex">
			<div className="grid gap-y-6 md:space-x-10 md:items-center md:justify-center md:flex">
				{NAV_LINKS.map((link, id) => (
					<Link
						key={id}
						to={link.href}
						title={link.title}
						onClick={() => close && close()}
						className="text-xs font-bold tracking-widest text-gray-900 uppercase transition-all duration-200 hover:text-indigo-600"
					>
						{link.title}
					</Link>
				))}
			</div>
		</nav>
	);
}
