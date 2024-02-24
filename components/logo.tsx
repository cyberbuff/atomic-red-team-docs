import { SiteSwitcher } from "./switcher";

export const Logo = () => (
	<>
		<img
			src={"/logo.png"}
			alt={"logo"}
			width={30}
			height={30}
			style={{
				marginRight: 4,
				pointerEvents: "none",
			}}
		/>
		<SiteSwitcher />
	</>
);
