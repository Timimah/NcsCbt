import { ThemeUIProvider } from 'theme-ui'
import { theme } from './theme'
import { useColorMode } from 'theme-ui'


const App = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <ThemeUIProvider theme={theme}>
      <h1
        sx={{
          color: 'primary',
          fontFamily: 'heading',
        }}
      >
        Hello
      </h1>
      <button
        // onClick={(e) => {
        //   setColorMode(colorMode === 'default' ? 'dark' : 'default')
        // }}
        // sx ={{
        //   backgroundColor: 'black'
        // }}
      >
        Toggle  {colorMode === 'default' ? 'Dark' : 'Light'}
      </button>
    </ThemeUIProvider>
  )
}

export default App
