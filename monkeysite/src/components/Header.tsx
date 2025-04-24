import './Header.css';

export default function Header(){
    return (
        <header class="d-flex justify-content-center py-3">
            <a  class="text-decoration-none"
                id="header-text" 
                href="/">
                <h1 class="display-5">🐒 Monkey Repository 🐒</h1>
            </a>
        </header>
    );
}