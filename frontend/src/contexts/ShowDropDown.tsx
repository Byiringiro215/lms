import { create } from 'zustand'

type DropDownStore = {
  showDropDown: boolean
  setShowDropDown: () => void
}

const useShowDropDown = create<DropDownStore>((set, get) => ({
  showDropDown: false,
  setShowDropDown: () => set({ showDropDown: !get().showDropDown }),
}))

export default useShowDropDown
