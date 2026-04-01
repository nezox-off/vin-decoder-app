import { use, useEffect } from "react"
import { VariableCard } from "./VariableCard";
import type { Variable } from "~/types";

type VariablesProps = {
  variablesPromise: Promise<Variable[]>
}

export const Variables = ({ variablesPromise }: VariablesProps) => {
  const data: Variable[] = use(variablesPromise);

  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
    {data.map(variable => (
      <VariableCard variable={variable} key={variable.ID} />
    ))}
  </div>
}
