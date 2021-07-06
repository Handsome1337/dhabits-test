import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faBookOpen, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import {fetchData} from '../../utils';

function FolderItem({item, SubList}) {
  const [isActive, setIsActive] = useState(false);
  const [children, setChildren] = useState({isSet: false, list: null});

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
