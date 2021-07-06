import FolderItem from '../FolderItem/FolderItem';

function FolderList() {
  return (
    <ul className="list-group w-25">
      {
        ['Один', 'Два', 'Три'].map((it) => <FolderItem key={it} text={it} />)
      }
    </ul>
  );
}

export default FolderList;
