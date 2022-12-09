import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.module.css';
import AppRouter from './components/app-router/app-router';
import { getUser } from './services/actions/authActions';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <AppRouter />
  )
}

export default App;
