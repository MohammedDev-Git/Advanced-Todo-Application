import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from "@/routes/index"
import '@/index.css'

// Redux Store & Persist
import { persistor, store } from "@/app/store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

// Context API
import ModeProvider from '@/contexts/mode/ModeProvider'
import ThemeProvider from './contexts/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <ModeProvider>
        <ThemeProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </ThemeProvider>
      </ModeProvider>
    </Provider>
  </StrictMode>
)