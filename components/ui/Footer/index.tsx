import styles from './styles.module.scss';

const links = [
  {
    url: '#',
    text: 'Manage Account',
  },
  {
    url: '#',
    text: 'FAQs',
  },
  {
    url: '#',
    text: 'Help',
  },
];

const newsLinks = [
  {
    url: '#',
    text: 'Latest Updates',
  },
  {
    url: '#',
    text: 'Press Releases',
  },
  {
    url: '#',
    text: 'Blog',
  },
];

const communityLinks = [
  {
    url: '#',
    text: 'Forums',
  },
  {
    url: '#',
    text: 'Events',
  },
  {
    url: '#',
    text: 'Partnerships',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-10">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col">
          <h1 className="text-2xl hover:text-primary transition-colors duration-300 flex items-center mb-4">
            What’s the Water Like?
            <img src="/images/wind.png" alt="logo" className="w-8 h-8 ml-2 invert" />
          </h1>
          <p className="text-gray-400 text-sm">Your go-to source for simple live water conditions and <br/>your go-to source for all tips and knowledge</p>
        </div>

        {/* Links Sections */}
        <div className="flex space-x-10">
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* News Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">News</h3>
            <ul>
              {newsLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Community</h3>
            <ul>
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">Sign up for our newsletter to receive the latest water condition updates.</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full text-sm rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-primary text-sm hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} What’s the Water Like? All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
