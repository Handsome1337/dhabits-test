import FolderItem from '../FolderItem/FolderItem';

function FolderList({data}) {
  if (!data) {
    return null;
  }

  return (
    <ul className="list-group">
      {
        data.map((it) => (
          <FolderItem key={it.id} item={it}>
            <FolderList data={it.children} />
          </FolderItem>
        ))
      }
    </ul>
  );
}

export default FolderList;
