import React from "react";
import { EuiCard, EuiCardProps, EuiFlexItem } from "@elastic/eui";

export function Card(
  props: Pick<EuiCardProps, "icon" | "title" | "description">,
) {
  return (
    <EuiFlexItem>
      <EuiCard hasBorder {...props} />
    </EuiFlexItem>
  );
}
