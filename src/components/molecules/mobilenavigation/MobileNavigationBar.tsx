import CategoryOutlined from '@Atoms/icons/CategoryOutline'
import Home from '@Atoms/icons/Home'
import ShoppingBagOutlined from '@Atoms/icons/ShoppingBagOutlined'
import User2 from '@Atoms/icons/User2'
import NavLink from '@Molecules/navlink/NavLink'
import useWindowSize from '@Atoms/hooks/useWindowSize'
import { Badge, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import { layoutConstant } from '@Atoms/utils/constants'
import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { getCart } from '../../../../store/slices/cartSlice'

const useStyles = makeStyles(({ palette }: MuiThemeProps) => ({
  root: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    // color: palette.primary.main,
    height: layoutConstant.mobileNavHeight,
    justifyContent: 'space-around',
    background: palette.background.paper,
    boxShadow: '0px 1px 4px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 999,

    '@media only screen and (max-width: 900px)': {
      display: 'flex',
      width: '100vw',
    },
  },

  link: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px',
  },

  icon: {
    marginBottom: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const MobileNavigationBar = () => {
  const width = useWindowSize()
  const classes = useStyles()
  const cart = useAppSelector(getCart)

  return width <= 900 ? (
    <Box className={classes.root}>
      {list.map((item) => (
        <NavLink className={classes.link} href={item.href} key={item.title}>
          {item.title === 'Cart' ? (
            <Badge badgeContent={cart?.products?.length} color="primary">
              <item.icon className={classes.icon} fontSize="small" />
            </Badge>
          ) : (
            <item.icon className={classes.icon} fontSize="small" />
          )}

          {item.title}
        </NavLink>
      ))}
    </Box>
  ) : null
}

const list = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
  },
  {
    title: 'Category',
    icon: CategoryOutlined,
    href: '/mobile-category-nav',
  },
  {
    title: 'Cart',
    icon: ShoppingBagOutlined,
    href: '/cart',
  },
  {
    title: 'Account',
    icon: User2,
    href: '/profile',
  },
]

export default MobileNavigationBar
