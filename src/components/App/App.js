import Header from '../Header/Header';
import FolderList from '../FolderList/FolderList';

const mockData = [
  {
    id: 1,
    text: 'Один',
    children: []
  },
  {
    id: 2,
    text: 'Два'
  },
  {
    id: 3,
    text: 'Три',
    children: [
      {
        id: 4,
        text: 'Четыре'
      },
      {
        id: 5,
        text: 'Пять',
        children: [
          {
            id: 6,
            text: 'Шесть'
          },

        ]
      },
    ]
  },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="w-25">
          <FolderList data={mockData} />
        </div>
      </main>
    </>
  );
}

export default App;
