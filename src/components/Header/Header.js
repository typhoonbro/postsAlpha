function Header() {
    return(
        <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                <svg class='me-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                        Blog Posts
                    </a>
                <button class="navbar-toggler border border-4 rounded-2 border-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link  text-light" href="/Cadastrar">Cadastrar</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link  text-light" href="/Pesquisar">Pesquisar</a>
                        </li>
                    </ul>
                </div>
            </div>
      </nav>
    )
}
export default Header;