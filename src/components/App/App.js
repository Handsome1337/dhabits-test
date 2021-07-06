import {useState, useEffect} from 'react';
import Header from '../Header/Header';
import FolderList from '../FolderList/FolderList';
import {fetchData} from '../../utils';

function App() {
  const [data, setData] = useState([]);

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
        <div className="w-25">
          <FolderList data={data} />
        </div>
      </main>
    </>
  );
}

export default App;
