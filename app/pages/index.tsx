import { VINForm } from "~/components/VINForm";
import { VINHistory } from "~/components/VINHistory";
import { useVINVariablesStore } from "~/stores/variablesStore";
import type { VinDecode } from "~/types";

const EXCLUDED_VARIABLES = new Set([
  "Error Code",
  "Error Text",
  "Additional Error Text",
  "Suggested VIN",
  "Possible Values",
  "Vehicle Descriptor",
  "NCSA Body Type",
  "NCSA Make",
  "NCSA Model",
  "NCSA Note",
]);


export function Main() {
  const VINVariables = useVINVariablesStore(state => state.VINVariables);



  const filteredVariables = VINVariables.filter((item) =>
    Boolean(item.Value) &&
    item.Value !== "Not Applicable" &&
    !EXCLUDED_VARIABLES.has(item.Variable)
  )


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-mono">
        <VINForm />
        <VINHistory/>
        {VINVariables.length !== 0 && (
              <section className="mt-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {filteredVariables
                    .map((variable) => (
                      <div
                        key={`${variable.VariableId}${variable.Value}`}
                        className="group relative bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200"
                      >
                        <p className="text-xs text-zinc-500 mb-1 truncate">
                          {variable.Variable}
                        </p>

                        <p className="text-sm font-semibold text-zinc-100 leading-snug">
                          {variable.Value}
                        </p>

                        {variable.ValueId && (
                          <span className="absolute top-3 right-3 text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                            #{variable.ValueId}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </section>
        )}
      </div>
  );
}
