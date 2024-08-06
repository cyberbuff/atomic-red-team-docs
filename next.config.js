const withNextra = require("nextra")({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.tsx",
	defaultShowCopyCode: true,
	flexsearch: {
		codeblocks: false,
	},
});

const redirects = [
	"credential-access",
	"execution",
	"persistence",
	"privilege-escalation",
	"defense-evasion",
	"initial-access",
	"collection",
	"impact",
	"discovery",
	"lateral-movement",
	"command-and-control",
	"exfiltration",
	"reconnaissance",
].map((tactic) => ({
	source: `/${tactic}/:path*`,
	destination: "/atomic-red-team/atomics/:path*",
	permanent: true,
}));

module.exports = withNextra({
	reactStrictMode: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	experimental: { optimisticClientCache: false },
	async redirects() {
		return redirects.concat([
			{
				source: "/atomic-red-team/atomics",
				destination: "/atomic-red-team/atomics/T1003",
				permanent: true,
			},
			{
				source: "/atomics/:path*",
				destination: "/atomic-red-team/atomics/:path*",
				permanent: true,
			},
		]);
	},
});
