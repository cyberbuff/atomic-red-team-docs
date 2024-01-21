/* eslint-disable @typescript-eslint/no-unsafe-call -- Lots of Nextra magic. */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Lots of Nextra magic. */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Lots of Nextra magic. */
// @ts-ignore
import {Navbar} from "nextra-theme-docs";
import {useTurboSite} from "./switcher";

export function Navigation(props): JSX.Element {
    const site = useTurboSite();
    const leadingItem = props.items[0];
    if (leadingItem.id !== "docs") {
        props.items.unshift({
            title: "Docs",
            type: "page",
            route: site ? `/${site}/docs` : "/atomic-red-team/docs",
            id: "docs",
            key: "docs",
        });
    }

    if (!props.items.map((item) => item.id).includes("atomics") && site === "atomic-red-team") {
        props.items.push({
            title: "Atomics",
            type: "page",
            route: "/atomic-red-team/atomics/T1003",
            id: "atomics",
            key: "atomics",
        })
    }
    // remove the top level repo and pack links
    const headerItems = props.items.filter((item) => {
        return (
            item.name !== "atomic-red-team" && item.name !== "invoke-atomicredteam"
        );
    });

    return <Navbar {...props} items={headerItems}/>;
}
