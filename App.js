import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";

const persistor = persistStore(store);

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HomeScreen />
        </PersistGate>
      </Provider>
  );
}
