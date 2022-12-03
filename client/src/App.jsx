import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.module.css';
import AppRouter from './components/app-router/app-router';
import { getUser } from './services/actions/auth';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <AppRouter />
  )
}

export default App;
