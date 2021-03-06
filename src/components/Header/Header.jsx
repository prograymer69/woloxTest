import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import Button from '../Button/Button'
import { useScrollSection } from 'react-scroll-section'
import logo from './../../assets/logo_full_color.svg'
import './headerStyles.scss'

const Header = () => {
  const location = useLocation()
  const auth = useSelector((store) => store.auth)
  const fav = useSelector((store) => store.list)

  const [isSticky, setSticky] = useState(false)
  const homeSection = useScrollSection('home')
  const BenefitSection = useScrollSection('benefits')

  const handleScroll = () => {
    const sticky = window.scrollY > 0
    setSticky(sticky)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('favorites')
    window.location.href = '/'
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [fav])

  const favorites = localStorage.getItem('favorites')
  const totalFavorites =
    favorites === null ? 0 : JSON.parse(favorites).length ?? 0
  const bulletFav = totalFavorites > 0 ? (<span className="bulletFav">{totalFavorites}</span>) : ('')

  const logoutOption = auth.login ? <a onClick={logout}>Salir</a> : ''

  return (
    <div className={isSticky ? 'contentHeader sticky' : 'contentHeader'}>
      <div className="contentLogo">
        <img src={logo} className="logo zoom" />
      </div>

      {location.pathname === '/' && (
        <div className="contentActions">
          <a
            selected={homeSection.selected}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              homeSection.onClick()
            }}
          >
            Inicio
          </a>
          <a
            selected={BenefitSection.selected}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              BenefitSection.onClick()
            }}
          >
            Beneficios
          </a>
          {logoutOption}
          {auth.login === false && (
            <Button name="Registro" redirect="/Register" className="light" />
          )}
          {auth.login && (
            <Button name="Listado" redirect="/List" className="light" />
          )}
        </div>
      )}

      {location.pathname !== '/' && (
        <div className="contentActions">
          {logoutOption}
          {bulletFav}
          <Button
            name={
              location.pathname === '/TermsAndConditions'
                ? 'Volver al registro'
                : 'Volver al inicio'
            }
            redirect="/"
            className="light"
            close={location.pathname === '/TermsAndConditions'}
          />
        </div>
      )}
    </div>
  )
}

export default Header
