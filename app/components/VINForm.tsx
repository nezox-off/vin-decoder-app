import { type SubmitEvent } from "react"
import { useVINVariablesStore } from "~/stores/variablesStore"
import type { VinDecode } from "~/types";


export const VINForm = () => {
  const currentVIN = useVINVariablesStore((state) => state.currentVIN);
  const setVIN = useVINVariablesStore((state) => state.setVIN);
  const setVINVariables = useVINVariablesStore((state) => state.setVINVariables);
  const setVINHistory = useVINVariablesStore((state) => state.setNewHistory);
  const error = useVINVariablesStore((state) => state.error);
  const setError = useVINVariablesStore((state) => state.setError);



  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (currentVIN.length < 17) {
      setError("У полі недостатньо символів")
      return
    }

    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${currentVIN}?format=json`)
    const data = await res.json()

    const errorCode = data.Results.find((v: VinDecode) => v.Variable === "Error Code")?.Value
    const errorText = data.Results.find((v: VinDecode) => v.Variable === "Error Text")?.Value

      if (errorCode !== "0") {
        setError(errorText ?? "Unknown VIN")
        return
      }
    setVINVariables(data.Results)
    setVINHistory(currentVIN)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-24 flex flex-col items-center gap-6">

      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-100 font-mono">
          VIN<span className="text-orange-500">_</span>DECODER
        </h1>
        <p className="text-xs text-zinc-500 mt-1 tracking-widest uppercase">
          Введіть 17-значний ідентифікаційний номер транспортного засобу
        </p>
      </div>

      <div className="flex items-stretch gap-0 w-full max-w-xl">
        <input
          type="text"
          value={currentVIN}
          onChange={(e) => setVIN(e.target.value.toUpperCase())}
          onBlur={() => setError("")}
          onFocus={() => setError("")}
          placeholder="e.g. 5UXWX7C55BA123456"
          maxLength={17}
          required
          spellCheck={false}
          className="flex-1 bg-zinc-900 border border-zinc-700 border-r-0 rounded-l px-4 py-3 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-400 text-zinc-950 text-xs font-bold font-mono px-5 rounded-r transition-colors duration-150"
        >
          DECODE →
        </button>
      </div>

      {error.length > 0 && <p className="text-red-400">{error}</p>}

      <p className="text-xs font-mono text-zinc-600">
        <span className={currentVIN.length === 17 ? "text-orange-400" : "text-zinc-500"}>
          {currentVIN.length}
        </span>
        /17
      </p>

    </form>
  )
}
