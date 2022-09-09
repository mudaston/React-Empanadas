import { createContext, FC, useContext, useState } from 'react'

interface OwnProps {
  children: JSX.Element
}

type Props = OwnProps

const HeaderContext = createContext(false)
const HeaderUpdateContext = createContext({
  setHeaderHidden: () => {},
  setHeaderVisible: () => {},
})

export const useHeaderContext = () => useContext(HeaderContext)
export const useToggleHeaderVisibilityContext = () => useContext(HeaderUpdateContext)

const HeaderContextProvider: FC<Props> = ({ children }) => {
  const [showHeader, setShowHeader] = useState(false)

  const functions = {
    setHeaderHidden: () => {
      setShowHeader(false)
    },
    setHeaderVisible: () => {
      setShowHeader(true)
    },
  }

  return (
    <HeaderContext.Provider value={showHeader}>
      <HeaderUpdateContext.Provider value={functions}>{children}</HeaderUpdateContext.Provider>
    </HeaderContext.Provider>
  )
}

export default HeaderContextProvider
