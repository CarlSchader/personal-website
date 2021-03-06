import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import Responsive from './Responsive';
import logo from '../public/logo.png';
import paths, { StyleIcon } from '../config/paths';
import process from 'process';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
    // position: 'fixed',
    // width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      maxWidth: "10%",
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  AppBar: {
    // margin: theme.spacing(2),
  },
}));

const tabList = [];

Object.keys(paths).forEach(path => {
  if (path !== '/') {
    tabList.push(path);
  } 
});

export default function PrimarySearchAppBar() {
  const router = useRouter();

  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchString, setSearchString] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [docsListOpen, setDocsListOpen] = useState(true);

  const pathBase = '/' + router.pathname.split('/')[1];
  const pathObject = paths[pathBase];

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (searchString.length > 0) {
    onkeypress = e => {
      if (e.key === 'Enter') {
        setAccessKey(searchString);
        router.replace(`/record`);
      }
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function MenuItems({ loggedIn }) {
    return loggedIn ?
      [
        <Link key="0" href={`/api/subscription`} passHref >
          <MenuItem key="0" >
            Upgrade
          </MenuItem>
        </Link>,
        <Link key="2" href="/api/auth/logout" passHref ><MenuItem key="2" >Logout</MenuItem></Link>
      ] :
      [
        <Link key="3" href="/api/auth/login" passHref ><MenuItem key="3" >Login</MenuItem></Link>
      ];
  }

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.AppBar} position="fixed">
        <Toolbar>
          <Responsive
            mobile={
              <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            }
          />
          <Responsive
            desktop={
              <Link href="/">
                <a style={{ color: "white" }} ><Typography variant="h5">{process.env.NEXT_PUBLIC_APP_NAME}</Typography></a>
              </Link>
            }
          />
          <Responsive
            desktop={
              <Tabs value={tabList.indexOf(pathBase)} >
                {tabList.map(path => (
                  <Link key={path} href={path} passHref>
                    <Tab label={<Typography variant="h6">{paths[path].name}</Typography>} />
                  </Link>
                ))}
              </Tabs>
            }
          />
          <div className={classes.grow} />
          <Responsive
            desktop={
              pathObject ?
                <><StyleIcon icon={pathObject.icon} style={{ size: '3rem' }} /><Typography variant="h4">{pathObject.name}</Typography></> :
                <></>
            }
            mobile={
              pathObject ?
                <><StyleIcon icon={pathObject.icon} style={{ size: '2rem' }} /><Typography variant="h5">{pathObject.name}</Typography></> :
                <></>
            }
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.keys(paths).map(path => (
            <Link key={path} href={path} passHref>
              <ListItem button key={paths[path].name}>
                <ListItemIcon><StyleIcon icon={paths[path].icon} style={{ size: "1.75rem" }} /></ListItemIcon>
                <ListItemText primary={paths[path].name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}