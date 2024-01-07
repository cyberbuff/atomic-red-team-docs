import {QueryClient, QueryClientProvider, useQuery,} from '@tanstack/react-query'
import axios from "axios";
import {
    EuiBadge,
    EuiBasicTableColumn,
    EuiFlexGroup,
    EuiFlexItem,
    EuiIcon,
    EuiInMemoryTable,
    EuiLoadingSpinner,
    EuiProvider,
    EuiSearchBarProps
} from '@elastic/eui';
import React from 'react';
import uniq from "lodash/uniq"
import '@elastic/eui/dist/eui_theme_dark.css';


const queryClient = new QueryClient()

async function getAtomics() {
    return await axios.get("/atomics.json").then((res) => res.data)
}

export default function App() {

    return (
        <EuiProvider colorMode={"dark"}>
            <QueryClientProvider client={queryClient}>
                <div style={{backgroundColor: "black"}}>
                    <Table/>
                </div>
            </QueryClientProvider>
        </EuiProvider>
    )
}

type AttackTechnique = {
    attack_technique: string
    display_name: string
    executors: string[]
    supported_platforms: string[]
    phases: string[]
}

export function Table() {

    const {isPending, error, data} = useQuery({queryKey: ['atomics'], queryFn: getAtomics})
    const executorUrls = {
        "windows": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg",
        "linux": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1920px-Tux.svg.png",
        "macos": "https://upload.wikimedia.org/wikipedia/commons/2/22/MacOS_logo_%282017%29.svg",
        "iaas:gcp": "https://www.gstatic.com/pantheon/images/welcome/supercloud.svg",
        "iaas:aws": "https://pbs.twimg.com/profile_images/1641476962362302464/K8lb6OtN_400x400.jpg",
        "office-365": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_365_%282022%29.svg/1024px-Microsoft_365_%282022%29.svg.png?20231004051714",
        "google-workspace": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
        "containers": "https://kubernetes.io/images/favicon.png",
        "iaas:azure": "https://swimburger.net/media/ppnn3pcl/azure.png",
        "azure-ad": "https://static-00.iconduck.com/assets.00/azure-active-directory-aad-icon-1951x2048-2rv1xjcr.png"
    }
    const tacticColors: Record<string, string> = {
        "execution": "primary",
        "persistence": "success",
        "privilege-escalation": 'accent',
        "defense-evasion": 'warning',
        "initial-access": 'hollow',
        "collection": 'default',
        "impact": '#0000FF',
        "discovery": '#FFA500',
        "lateral-movement": 'danger',
        "command-and-control": '#FEA27F',
        "exfiltration": '#FCF7BC',
        "credential-access": '#BADA55',
        "reconnaissance": '#DDD'
    }
    if (isPending) {
        return <EuiLoadingSpinner/>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    const atomics = data ?? []
    const columns: EuiBasicTableColumn<AttackTechnique>[] = [
        {
            field: "attack_technique",
            name: "ID",
            sortable: true,
            width: "100px"
        },
        {
            field: "display_name",
            name: "Name",
            sortable: true,
            width: "600px"

        }, {
            field: "phases",
            name: "Tactic",
            width: "200px",
            render: value => {
                return <EuiFlexGroup wrap responsive={false} gutterSize="xs">
                    {value.map((tactic) => (
                        <EuiFlexItem grow={false} key={tactic}>
                            <EuiBadge color={tacticColors[tactic]}>{tactic}</EuiBadge>
                        </EuiFlexItem>
                    ))}
                </EuiFlexGroup>
            }
        }, {
            field: "supported_platforms",
            name: "Platforms",
            render: (value) => {
                return <EuiFlexGroup gutterSize={"s"}>
                    {(value.sort()).map(x => {
                        return <EuiFlexItem grow={false} key={x}>
                            <EuiIcon type={executorUrls[x] ?? ""} size="xxl" title={x}/>
                        </EuiFlexItem>
                    })}
                </EuiFlexGroup>
            }
        }, {
            field: "executors",
            name: "Executors"
        }
    ]


    const search: EuiSearchBarProps = {
        box: {
            incremental: true,
            schema: true,
        },
        filters: [
            {
                type: 'field_value_selection',
                field: 'phases',
                name: 'Tactic',
                multiSelect: false,
                options: uniq(atomics.map(({phases}) => phases).flat(1)).map(x => ({
                    value: x,
                })),
            }, {
                type: 'field_value_selection',
                field: 'supported_platforms',
                name: 'Platforms',
                multiSelect: false,
                options: uniq(atomics.map(({supported_platforms}) => supported_platforms).flat(1)).map(x => ({
                    value: x,
                })),
            }, {
                type: 'field_value_selection',
                field: 'executors',
                name: 'Executors',
                multiSelect: false,
                filterWith: "prefix",
                options: uniq(atomics.map(({executors}) => executors).flat(1)).map(x => ({
                    value: x,
                })),
            },
        ],
    };

    return <EuiInMemoryTable columns={columns} items={atomics}
                             loading={isPending} sorting={{
        sort: {
            field: "attack_technique",
            direction: "asc"
        }
    }} search={search}
                             pagination={{
                                 pageSizeOptions: [10, 20, 50, 0],
                                 initialPageSize: 10,
                                 initialPageIndex: 0
                             }}
    />
}
