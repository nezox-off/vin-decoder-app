"use client"
import { Suspense } from "react"
import { Variables } from "~/components/Variables"
import type { Variable } from "~/types";

const fetchVariables = async (): Promise<Variable[]> => {
  const res = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json");
  const data = await res.json();
  return data.Results;
}

export const VariablesWrapper = () => {

  return (
      <Suspense fallback={<p className="text-white font-bold pt-16">Loading variables...</p>}>
        <Variables variablesPromise={fetchVariables()} />
      </Suspense>
  )
}
