import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container'>
      <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
        <NavLink
          to='/'
          className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'
        >
          <svg className='bi me-2' width={40} height={32}>
            <use xlinkHref='#bootstrap' />
          </svg>
          <span className='fs-4'>Cine FCI</span>
        </NavLink>
        <ul className='nav nav-pills'>

          <li className='nav-item'>
            <NavLink to='/' className='nav-link' aria-current='page'>
              Inicio
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink to='/about' className='nav-link'>
              Acerca de
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink to='/faq' className='nav-link'>
              Preguntas Frecuentes
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink to='/contact' className='nav-link'>
              Contacto
            </NavLink>
          </li>

        </ul>
      </header>
    </div>

  )
}
export default Header
