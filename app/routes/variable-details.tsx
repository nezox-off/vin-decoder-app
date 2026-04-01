import type { VariableValue } from "~/types";
import type { Route } from "./+types/variables";

const fetchVariableDetails = async (variableId: string) => {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleVariableValuesList/${variableId}?format=json`
  );
  const data = await res.json();
  return data.Results as VariableValue;
}

export async function loader({ params: { variableId } }: { params: { variableId: string } }) {
  const variable = await fetchVariableDetails(variableId);
  return { data: variable };
}

export default function VariableDetails({ loaderData }: {loaderData: { data: VariableValue[]}}) {
  const values: VariableValue[] = loaderData.data;
  const elementName = values[0]?.ElementName ?? "Variable";

  return (
    <div className="px-6 py-16 font-mono">

      <div className="mb-10 border-l-2 border-orange-500 pl-4">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
          Variable / Lookup Values
        </p>
        <h1 className="text-2xl font-bold text-zinc-100">{elementName}</h1>
        <p className="text-xs text-zinc-600 mt-1">{values.length} values</p>
      </div>

      {values.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-4xl mb-4">∅</div>
          <p className="text-zinc-500 text-sm">
          </p>
          <p className="text-zinc-600 text-xs mt-1">
          </p>
        </div>
      )}

      {values.length > 0 && (
        <ul className="space-y-px">
          {values.map((value, index) => (
            <li
              key={value.Id}
              className="group flex items-center justify-between gap-4 px-4 py-3 rounded bg-zinc-900 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all duration-150"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs text-zinc-600 w-6 shrink-0 text-right">
                  {index + 1}
                </span>
                <span className="text-sm text-zinc-200 truncate">
                  {value.Name}
                </span>
              </div>

              <span className="text-xs text-zinc-600 group-hover:text-orange-500 transition-colors shrink-0">
                #{value.Id}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
