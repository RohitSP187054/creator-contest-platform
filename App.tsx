
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Leaderboard } from './components/Leaderboard';
import { VideoUpload } from './components/VideoUpload';
import { SpinWheel } from './components/SpinWheel';
import { Referral } from './components/Referral';
import { Checkout } from './components/Checkout';
import { HomeIcon, LeaderboardIcon, UploadIcon, WheelIcon, LinkIcon, CreditCardIcon } from './components/icons/Icons';

type Page = 'home' | 'leaderboard' | 'upload' | 'spin' | 'referral' | 'checkout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'leaderboard':
        return <Leaderboard />;
      case 'upload':
        return <VideoUpload />;
      case 'spin':
        return <SpinWheel />;
      case 'referral':
        return <Referral />;
      case 'checkout':
        return <Checkout />;
      case 'home':
      default:
        return <Home />;
    }
  };
  
  const navItems = [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'upload', label: 'Video Upload', icon: <UploadIcon /> },
      { id: 'spin', label: 'Spin Wheel', icon: <WheelIcon /> },
      { id: 'referral', label: 'Referral Link', icon: <LinkIcon /> },
      { id: 'leaderboard', label: 'Leaderboard', icon: <LeaderboardIcon /> },
      { id: 'checkout', label: 'Stripe Checkout', icon: <CreditCardIcon /> },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-light">
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      
      {/* Sidebar Navigation */}
      <aside className={`fixed md:relative transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out bg-white md:bg-transparent shadow-lg md:shadow-none w-64 md:w-72 flex-shrink-0 z-40 md:z-auto h-full md:h-auto`}>
        <div className="p-4 md:p-8 md:sticky md:top-0">
          <h2 className="text-xl font-bold text-primary mb-6 mt-16 md:mt-0">Features</h2>
          <nav>
            <ul>
              {navItems.map(item => (
                <li key={item.id} className="mb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id as Page);
                    }}
                    className={`flex items-center p-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-600 hover:bg-light-hover'
                    }`}
                  >
                    <span className="w-6 h-6 mr-3">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300">
        <div className="w-full max-w-5xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

const Home = () => (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-primary mb-4">Welcome to the Creator Contest Platform!</h1>
        <p className="text-gray-600 mb-6">
            This is a showcase of a platform built to fulfill the requirements of a technical assessment. It demonstrates various features like video uploading, an interactive spin wheel, a persistent leaderboard, and more.
        </p>
        <p className="text-gray-600">
            Use the navigation on the left to explore the different features. Each component is designed to be reliable, user-friendly, and responsive, adhering to the specified brand guidelines.
        </p>
    </div>
);


export default App;
