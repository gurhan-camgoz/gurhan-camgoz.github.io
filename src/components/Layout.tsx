import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const links = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Projects', url: '/projects' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <div className="layout">
      <Header title="My Portfolio" links={links} />
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Portfolio</p>
      </footer>
    </div>
  );
};

export default Layout;