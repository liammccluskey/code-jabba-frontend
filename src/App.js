import {Provider} from 'react-redux'

import {store} from './redux/configureStore'
import {ThemeProvider} from './containers/ThemeProvider'
import {AuthContainer} from './containers/AuthContainer'
import {RouterProvider} from './containers/RouterProvider'
import { MessagesProvider } from './containers/MessagesProvider'

const App = props => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthContainer>
          <MessagesProvider>
            <RouterProvider />
          </MessagesProvider>
        </AuthContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App