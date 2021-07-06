import {useState} from 'react';

function FolderItem({item, children}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <li className="list-group-item border-0 p-1 ps-4">
        <button
          className={`marker${isActive ? ' marker--active' : ''} btn position-absolute p-0`}
          onClick={() => setIsActive((state) => !state)}
        >
          ▸
        </button>
        {item.text}
        {isActive && children}
      </li>
    </>
  );
}

export default FolderItem;
