import {useState, useEffect} from 'react';
import Store from '../../store/store';
import Header from '../Header/Header';
import FolderList from '../FolderList/FolderList';
import {fetchData} from '../../utils';

function App() {
  const [data, setData] = useState([]);
  const [listsState, setListsState] = useState({});

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res.children);
      })
  }, []);

  return (
    <>
      <Header />
      <main>
        <Store.Provider value={{
          listsState,
          setListsState
        }}>
          <div className="w-25">
            <FolderList data={data} />
          </div>
        </Store.Provider>
      </main>
    </>
  );
}

export default App;
