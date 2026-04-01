import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VinDecode } from "~/types";

interface VINStore {
  currentVIN: string,
  error: string,
  VINHistory: string[]
  VINVariables: VinDecode[]
  setVIN: (vin: string) => void,
  setError: (error: string) => void,
  setVINVariables: (variables: VinDecode[]) => void
  setNewHistory: (vin: string) => void
}

type VINStorePersisted = Pick<VINStore, "currentVIN" | "VINHistory">

export const useVINVariablesStore = create(persist<VINStore, [], [], VINStorePersisted>((set, get) => ({
  currentVIN: "",
  error: "",
  VINHistory: [],
  VINVariables: [],
  setVIN: (vin: string) => set({currentVIN: vin}),
  setError: (error: string) => set({ error }),
  setVINVariables: (variables: VinDecode[]) => set({ VINVariables: variables }),
  setNewHistory: (vin: string) => {
    const history = get().VINHistory.slice(0, 2);
    const findCurrentVINIndex = history.findIndex(v => v === vin);
    if (findCurrentVINIndex !== -1) return

    history.unshift(vin)
    set({ VINHistory: history })
  }
}), {
  name: "variables",
  partialize: (state) => ({
    currentVIN: state.currentVIN,
    VINHistory: state.VINHistory,
  })
}))
