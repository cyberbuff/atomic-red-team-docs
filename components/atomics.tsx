import {
  EuiBadge,
  EuiBasicTableColumn,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiInMemoryTable,
  EuiLoadingSpinner,
  EuiSearchBarProps,
} from "@elastic/eui";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import uniq from "lodash/uniq";
import Link from "next/link";
import React from "react";

const queryClient = new QueryClient();

async function getAtomics() {
  return await axios.get("/atomics.json").then((res) => res.data);
}

export function AtomicsTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ backgroundColor: "black" }}>
        <Table />
      </div>
    </QueryClientProvider>
  );
}

type AttackTechnique = {
  attack_technique: string;
  display_name: string;
  executors: string[];
  supported_platforms: string[];
  phases: string[];
};

export function Table() {
  const { isPending, error, data } = useQuery({
    queryKey: ["atomics"],
    queryFn: getAtomics,
  });
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
    "privilege-escalation": "accent",
    "defense-evasion": "warning",
    "initial-access": "hollow",
    collection: "default",
    impact: "#0000FF",
    discovery: "#FFA500",
    "lateral-movement": "danger",
    "command-and-control": "#FEA27F",
    exfiltration: "#FCF7BC",
    "credential-access": "#BADA55",
    reconnaissance: "#DDD",
  };
  if (isPending) {
    return <EuiLoadingSpinner />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const atomics = data ?? [];
  const columns: EuiBasicTableColumn<AttackTechnique>[] = [
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
      field: "display_name",
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
      name: "Platforms",
      width: "300px",
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
      field: "executors",
      name: "Executors",
      width: "150px",
      render: (value) => {
        return (
          <EuiFlexGroup gutterSize={"s"}>
            {value.sort().map((x) => {
              return (
                <EuiFlexItem grow={false} key={x}>
                  <EuiIcon type={executorUrls[x] ?? ""} size="xl" title={x} />
                </EuiFlexItem>
              );
            })}
          </EuiFlexGroup>
        );
      },
    },
  ];

  const search: EuiSearchBarProps = {
    box: {
      incremental: true,
      schema: true,
    },
    filters: [
      {
        type: "field_value_selection",
        field: "phases",
        name: "Tactic",
        multiSelect: false,
        options: uniq(atomics.map(({ phases }) => phases).flat(1)).map((x) => ({
          value: x,
        })),
      },
      {
        type: "field_value_selection",
        field: "supported_platforms",
        name: "Platforms",
        multiSelect: false,
        options: uniq(
          atomics.map(({ supported_platforms }) => supported_platforms).flat(1),
        ).map((x) => ({
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
        field: "executors",
        name: "Executors",
        multiSelect: false,
        operator: "exact",
        options: uniq(atomics.map(({ executors }) => executors).flat(1)).map(
          (x) => ({
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
          }),
        ),
      },
    ],
  };

  return (
    <EuiInMemoryTable
      tableCaption="Atomic Red Team Atomics"
      columns={columns}
      items={atomics}
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
