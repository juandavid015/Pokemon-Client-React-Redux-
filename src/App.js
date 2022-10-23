import './App.css';
import { Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Body from './components/body/Body';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAbilities,  getAlltypes } from './redux/actions/actions';
import Footer from './components/footer/Footer';

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAlltypes());
    dispatch(getAllAbilities())
  })
  

  return (
    <div className="App">
      <Route path={'/'} component={Header} />
      <Route path={'/'} component={Body} />
      {location.pathname !== '/' ? <Footer />: <></>}
    </div>
  );
}

export default App;
