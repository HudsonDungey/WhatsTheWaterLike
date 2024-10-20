import styles from './styles.module.scss';

const links = [
  {
    url: '',
    text: 'Manage Account',
  },
  {
    url: '',
    text: 'FAQs',
  },
  {
    url: '',
    text: 'Help',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 min-h-[90px] flex px-20 items-center justify-between">
        <div>
        <h1 className="text-2xl hover:text-primary transition-colors duration-300 flex flex-row">
              Whats the water like?
             <img src="/images/wind.png" alt="logo" className="w-[30px] h-[30px] invert" />
        </h1>
        </div>
      <div className="flex flex-col">
        {links.map(({ url, text }, index) => (
          <a
            href={url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
          {text}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;