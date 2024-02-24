import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";

export type TurboSite = "invoke-atomicredteam" | "atomic-red-team";

export function useTurboSite(): TurboSite | undefined {
	const { pathname } = useRouter();

	if (pathname.startsWith("/invoke-atomicredteam")) {
		return "invoke-atomicredteam";
	}

	if (pathname.startsWith("/atomic-red-team")) {
		return "atomic-red-team";
	}

	return undefined;
}

type Props = {
	href: string;
	text: string;
	isActive: boolean;
};

function SiteSwitcherLink({ href, text, isActive }: Props) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const classes = "text-white px-3 py-1 rounded-md";

	const conditionalClasses = {
		"bg-[#333333] mr-1": Boolean(isActive),
	};
	if (isClient) {
		return (
			<Link className={cn(classes, conditionalClasses)} href={href}>
				{text}
			</Link>
		);
	}
	return null;
}

export function SiteSwitcher() {
	const site = useTurboSite();
	console.log(site);
	return (
		<div className="flex items-center justify-start space-x-4 bg-[#0D0D0D] px-4 py-2">
			<div className="flex items-center rounded-lg bg-[#1E1E1E] px-2 py-1">
				<SiteSwitcherLink
					href="/atomic-red-team"
					text="AtomicRedTeam"
					isActive={site === "atomic-red-team"}
				/>
				<SiteSwitcherLink
					href="/invoke-atomicredteam"
					text="Invoke-Atomic"
					isActive={site === "invoke-atomicredteam"}
				/>
			</div>
		</div>
	);
}
