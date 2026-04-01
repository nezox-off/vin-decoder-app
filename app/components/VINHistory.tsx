import { useVINVariablesStore } from "~/stores/variablesStore"


// const VINHistoryList = [
//   "1FTFW1CT5DFC10312",
//   "JN1AZ4EH7DM430111",
//   "WDDGF3BB4DF968608",
//   "WVGEK9BP3CD010788"
// ]

export const VINHistory = () => {
  const VINHistoryList = useVINVariablesStore(state => state.VINHistory);
  const setCurrentVIN = useVINVariablesStore(state => state.setVIN);
  const handleChooseVIN = (vin: string) => {
    setCurrentVIN(vin);
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="text-zinc-500 text-lx">Історія введених VIN-кодів</p>
      {VINHistoryList.length !== 0 ? <ul className="flex gap-4 mt-3">
        {VINHistoryList.map(item => (
          <li key={item} onClick={() => handleChooseVIN(item)} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 rounded p-4 transition-all duration-150 cursor-pointer">{item}</li>
        ))}
      </ul> : <p className="text-zinc-700 mt-3">Список порожній</p>}
    </div>
  )
}
