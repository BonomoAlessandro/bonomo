import Header from './components/Header';
import Hero from './components/Hero';
import History from './components/History';
import Timeline from './components/Timeline';
import CoatOfArms from './components/CoatOfArms';
import FamilyTree from './components/FamilyTree';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <History />
        <Timeline />
        <CoatOfArms />
        <FamilyTree />
      </main>
      <Footer />
    </>
  );
}
