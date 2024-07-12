import {
	EuiBadge,
	type EuiBasicTableColumn,
	EuiButtonIcon,
	EuiFlexGroup,
	EuiFlexItem,
	EuiIcon,
	EuiInMemoryTable,
	EuiLoadingSpinner,
	EuiNotificationBadge,
	EuiSearchBar,
	type EuiSearchBarOnChangeArgs,
	type EuiSearchBarProps,
	EuiToolTip,
} from "@elastic/eui";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import uniq from "lodash/uniq";
import Link from "next/link";
import { unparse } from "papaparse";
import React, { useEffect, useRef, useState } from "react";

const queryClient = new QueryClient();

async function getAtomicTests() {
	return await axios.get("/atomic_tests.json").then((res) => res.data);
}

export function AtomicTestsTable() {
	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ backgroundColor: "black" }}>
				<Table />
			</div>
		</QueryClientProvider>
	);
}

type AtomicTest = {
	attack_technique: string;
	name: string;
	auto_generated_guid: string;
	executor: {
		name: string;
		elevation_required?: boolean;
		command: string;
		cleanup_command?: string;
	};
	supported_platforms: string[];
	phases: string[];
};

function Checkbox({ value }: { value: boolean }) {
	if (value) {
		return <EuiIcon type="checkInCircleFilled" size="m" color="success" />;
	}
	return <EuiIcon type="errorFilled" size="m" color="danger" />;
}

export function Table() {
	const [items, setItems] = useState<AtomicTest[]>([]);
	const [count, setCount] = useState(0);
	const ref = useRef<EuiInMemoryTable<AtomicTest>>();

	const { isPending, error, data } = useQuery<AtomicTest[]>({
		queryKey: ["atomics"],
		queryFn: getAtomicTests,
	});

	useEffect(() => {
		setItems(data ?? []);
	}, [data]);

	useEffect(() => {
		setCount(items.length);
	}, [items]);

	const executorUrls = {
		powershell:
			"https://upload.wikimedia.org/wikipedia/commons/a/af/PowerShell_Core_6.0_icon.png",
		sh: "https://img.icons8.com/fluency/48/console.png",
		command_prompt: "https://img.icons8.com/fluency/48/command-line.png",
		manual: "https://img.icons8.com/fluency/48/hammer.png",
		bash: "https://img.icons8.com/color/48/bash.png",
	};

	const platformUrls = {
		windows: "/platforms/windows.svg",
		linux: "/platforms/linux.svg",
		macos: "/platforms/macos.svg",
		"iaas:gcp": "/platforms/gcp.svg",
		"iaas:aws": "/platforms/aws.svg",
		"azure-ad": "/platforms/azuread.svg",
		"iaas:azure": "/platforms/azure.svg",
		"office-365": "/platforms/microsoft365.svg",
		"google-workspace":
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
		containers: "https://kubernetes.io/images/favicon.png",
	};

	const tacticColors: Record<string, string> = {
		execution: "primary",
		persistence: "success",
		collection: "default",
		impact: "#0000FF",
		discovery: "#FFA500",
		exfiltration: "#FCF7BC",
		reconnaissance: "#DDD",
		"credential-access": "#BADA55",
		"lateral-movement": "danger",
		"command-and-control": "#FEA27F",
		"privilege-escalation": "accent",
		"defense-evasion": "warning",
		"initial-access": "hollow",
	};
	if (isPending) {
		return <EuiLoadingSpinner />;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const columns: EuiBasicTableColumn<AtomicTest>[] = [
		{
			field: "attack_technique",
			name: "ID",
			sortable: true,
			width: "100px",
			render: (value) => {
				return <Link href={`/atomic-red-team/atomics/${value}`}>{value}</Link>;
			},
		},
		{
			field: "auto_generated_guid",
			name: "GUID",
			sortable: false,
			textOnly: true,
			width: "auto",
		},
		{
			field: "name",
			name: "Name",
			sortable: true,
			textOnly: true,
			width: "auto",
		},
		{
			field: "phases",
			name: "Tactic",
			width: "200px",
			render: (value) => {
				return (
					<EuiFlexGroup wrap responsive={false} gutterSize="xs">
						{value.map((tactic) => (
							<EuiFlexItem grow={false} key={tactic}>
								<EuiBadge color={tacticColors[tactic]}>{tactic}</EuiBadge>
							</EuiFlexItem>
						))}
					</EuiFlexGroup>
				);
			},
		},
		{
			field: "supported_platforms",
			name: "Platform(s)",
			width: "100px",
			render: (value) => {
				return (
					<EuiFlexGroup gutterSize={"s"}>
						{value.sort().map((x) => {
							return (
								<EuiFlexItem grow={false} key={x}>
									<EuiIcon type={platformUrls[x] ?? ""} size="xl" title={x} />
								</EuiFlexItem>
							);
						})}
					</EuiFlexGroup>
				);
			},
		},
		{
			field: "executor.name",
			name: "Executor",
			width: "90px",
			render: (value) => (
				<EuiIcon type={executorUrls[value] ?? ""} size="xl" title={value} />
			),
		},
		{
			field: "executor.elevation_required",
			name: "Elevation Required",
			dataType: "boolean",
			width: "90px",
			sortable: true,
			render: (value) => <Checkbox value={value ?? false} />,
		},
	];
	const supportedPlatforms = uniq(
		data.flatMap(({ supported_platforms }) => supported_platforms),
	);
	const executors = uniq(
		data.flatMap(({ executor }: AtomicTest) => executor.name),
	);

	const search: EuiSearchBarProps = {
		toolsLeft: [<EuiNotificationBadge key={1}>{count}</EuiNotificationBadge>],
		toolsRight: [
			<EuiToolTip
				position="top"
				content="Download as AtomicRunnerSchedule"
				key={1}
			>
				<EuiButtonIcon
					iconType="download"
					aria-label="Download"
					size="m"
					color="primary"
					onClick={() => {
						const downloadableData = items.map((item) => [
							item.attack_technique,
							item.name,
							item.auto_generated_guid,
							item.supported_platforms.join("|"),
							120,
							"",
							"",
							"TRUE",
							"",
						]);
						const csvContent = unparse({
							fields: [
								"Technique",
								"TestName",
								"auto_generated_guid",
								"supported_platforms",
								"TimeoutSeconds",
								"InputArgs",
								"hostname",
								"active",
								"notes",
							],
							data: downloadableData,
						});
						const blob = new Blob([csvContent], {
							type: "text/csv;charset=utf-8;",
						});
						const url = URL.createObjectURL(blob);

						// Create a link to download it
						const link = document.createElement("a");
						link.href = url;
						link.setAttribute("download", "AtomicRunnerSchedule.csv");
						link.click();
					}}
				/>
			</EuiToolTip>,
		],
		box: {
			incremental: true,
			schema: false,
		},
		filters: [
			{
				type: "field_value_selection",
				field: "executor.elevation_required",
				name: "Elevation",
				multiSelect: false,
				options: ["Required", "Not Required"].map((x: string) => ({
					value: x === "Required",
					view: (
						<>
							<Checkbox value={x === "Required"} />
							&nbsp; &nbsp;
							{x}
						</>
					),
				})),
			},
			{
				type: "field_value_selection",
				field: "phases",
				name: "Tactic",
				multiSelect: "or",
				options: uniq(data.flatMap(({ phases }) => phases)).map(
					(x: string) => ({
						value: x,
					}),
				),
			},
			{
				type: "field_value_selection",
				field: "supported_platforms",
				name: "Platforms",
				multiSelect: "or",
				options: supportedPlatforms.map((x: string) => ({
					value: x,
					view: (
						<>
							<EuiButtonIcon
								size="m"
								iconType={platformUrls[x] ?? ""}
								aria-label={x}
								color="success"
							/>
							{x}
						</>
					),
				})),
			},
			{
				type: "field_value_selection",
				field: "executor.name",
				name: "Executors",
				multiSelect: "or",
				operator: "exact",
				options: executors.map((x: string) => ({
					value: x,
					view: (
						<>
							<EuiButtonIcon
								iconType={executorUrls[x] ?? ""}
								aria-label="Dashboard"
								color="success"
							/>
							{x}
						</>
					),
				})),
			},
		],
		onChange: ({ query }: EuiSearchBarOnChangeArgs) => {
			setItems(EuiSearchBar.Query.execute(query, data));
		},
	};

	return (
		<EuiInMemoryTable<AtomicTest>
			ref={ref}
			tableCaption="Atomic Red Team Atomics"
			columns={columns}
			items={items}
			loading={isPending}
			sorting={{
				sort: {
					field: "attack_technique",
					direction: "asc",
				},
			}}
			search={search}
			pagination={{
				pageSizeOptions: [10, 20, 50, 0],
				initialPageSize: 10,
				initialPageIndex: 0,
			}}
		/>
	);
}
