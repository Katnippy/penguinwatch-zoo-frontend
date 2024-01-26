import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GoogleMap from './components/GoogleMap';

export default function App() {
  return (
    <>
      <Header />
      <div id="content">
        <Sidebar />
        <GoogleMap />
      </div>
    </>
  );
}
