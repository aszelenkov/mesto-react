import logoHead from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img 
        className="header__logo"
        src={logoHead} 
        alt='Логотип Mesto Russia' 
      />
    </header>
  );
}

export default Header;