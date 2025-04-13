import React from 'react'

import StackNavigator from './navigation/StackNavigator'
import { AuthProvider } from './AuthContext'
import { DataProvider } from './DataContext'
// import { ModalPortal } from 'react-native-modals'

export default function App() {
  
  return (
    <AuthProvider>
      <DataProvider>
        <StackNavigator/>
      </DataProvider>
    </AuthProvider>
  )
}