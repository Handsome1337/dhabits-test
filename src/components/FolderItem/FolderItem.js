import {useState} from 'react';
import {fetchData} from '../../utils';

function FolderItem({item, SubList}) {
  const [isActive, setIsActive] = useState(false);
  const [children, setChildren] = useState({isSet: false, list: null});

  const toggleActive = () => {
    setIsActive((state) => !state);

    if (item.children && !children.isSet) {
      fetchData(item.id)
        .then((res) => {
          setChildren({isSet: true, list: res.children ?? null})
        })
    }
  };

  const childrenList = isActive && children.list
    ? <SubList data={children.list} />
    : null;

  return (
    <>
      <li className="list-group-item border-0 p-1 ps-4">
        <button
          className={`marker${isActive ? ' marker--active' : ''} btn position-absolute p-0`}
          onClick={toggleActive}
        >
          ▸
        </button>
        {item.title}
        {childrenList}
      </li>
    </>
  );
}

export default FolderItem;
