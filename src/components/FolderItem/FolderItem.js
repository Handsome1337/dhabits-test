import {useState, useContext, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faBookOpen, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import Store from '../../store/store';
import {fetchData} from '../../utils';

function FolderItem({item, SubList}) {
  const {listsState, setListsState} = useContext(Store);

  // достаёт из стора информацию о том, был ли ранее открыт вложенный список
  // и есть ли у него дети, если это уже известно
  const isAlreadyOpen = listsState[item.id]?.isOpen;
  const knownChildren = listsState[item.id]?.children ?? null;
  const [isActive, setIsActive] = useState(!!isAlreadyOpen);
  const [children, setChildren] = useState({isSet: false, list: knownChildren});

  const previousStates = useRef({children, isActive});

  // записывает в стор детей каждого элемента списка
  useEffect(() => {
    const {current} = previousStates;
    const shouldEffect = current.isActive !== isActive && current.children !== children;

    if (shouldEffect) {
      setListsState((prev) => ({
        ...prev,
        [item.id]: {
          children: children.list,
          isOpen: isActive,
        },
      }));

      previousStates.current = {children, isActive};
    }
  }, [isActive, children, setListsState, item.id]);

  // если бы это был реальный проект, извлечение расширения надо было бы реализовать по-другому
  // в данном случае не учитывается, что папка может содержать в названии точку
  const fileExt = item.title.split('.').pop();
  let marker;

  if (['jpg', 'epub', 'zip'].includes(fileExt)) {
    let icon;
    if (fileExt === 'jpg') {
      icon = faFileImage;
    } else if (fileExt === 'epub') {
      icon = faBookOpen;
    } else {
      icon = faFileArchive;
    }
    marker = <FontAwesomeIcon icon={icon} size="xs" />;
  } else {
    marker = '▸';
  }

  const toggleActive = () => {
    if (marker !== '▸') {
      return;
    }

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
          {marker}
        </button>
        <span className="title">
          {item.title}
        </span>
        {childrenList}
      </li>
    </>
  );
}

export default FolderItem;
