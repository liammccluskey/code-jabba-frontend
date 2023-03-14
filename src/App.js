import {Provider} from 'react-redux'

import {store} from './redux/configureStore'
import {ThemeProvider} from './containers/ThemeProvider'
import {AuthContainer} from './containers/AuthContainer'
import {RouterProvider} from './containers/RouterProvider'
import { MessagesProvider } from './containers/MessagesProvider'
import { ModalProvider } from './containers/ModalProvider'
import { CssProvider } from './containers/CssProvider'

const App = props => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthContainer>
          <CssProvider>
            <ModalProvider>
              <MessagesProvider>
                <RouterProvider />
              </MessagesProvider>
            </ModalProvider>
          </CssProvider>
        </AuthContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App