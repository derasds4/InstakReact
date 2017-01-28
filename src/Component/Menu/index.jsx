import {Component} from 'react'
import {connect} from 'react-redux'
import {setOpened} from '../../Store/Action/UI/Menu'
import Drawer from 'material-ui/Drawer'
import ListItem from 'material-ui/List/ListItem'
import List from 'material-ui/List'
import {Link} from 'react-router'
import map from 'lodash/map'
import ActionHome from 'material-ui/svg-icons/action/home'
import AvPlaylistPlay from 'material-ui/svg-icons/av/playlist-play'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import AvPlayListAdd from 'material-ui/svg-icons/av/playlist-add'
import LicenseIcon from 'material-ui/svg-icons/action/account-balance-wallet'
import Responsive from 'react-responsive'
import DrawerHeader from './Header'

const items = [
    {
        name: 'home',
        path: '/',
        title: 'pages.main.title',
        icon: <ActionHome/>
    }, {
        name: 'task',
        path: '/task',
        title: 'pages.task.title',
        icon: <AvPlaylistPlay/>,
        items: [{
            name: 'add',
            path: '/task/add',
            title: 'pages.task.add.title',
            icon: <AvPlayListAdd />
        }]
    }, {
        name: 'license',
        path: '/license',
        title: 'pages.license.title',
        icon: <LicenseIcon />
    },{
        name: 'settings',
        path: '/settings',
        title: 'pages.settings.title',
        icon: <ActionSettings/>
    }
];

const MenuDrawerItem = ({ item, setOpened })=> (item.items
    ? (
        <ListItem
            primaryText={counterpart(item.title)}
            leftIcon={item.icon}
            primaryTogglesNestedList={true}
            nestedItems={map(item.items, (value, key)=> (
                <MenuDrawerItem key={value.name} item={value} setOpened={setOpened} />
            ))}
        />
    ) : (
        <Link to={"/app" + item.path}>
            <ListItem
                onClick={()=>setOpened(false)}
                leftIcon={item.icon}
                primaryText={counterpart(item.title)}
            />
        </Link>
    )
);

const MenuList = ({setOpened})=> (
    <List>
        {map(items, (item, index)=>(
            <MenuDrawerItem key={index} item={item} setOpened={setOpened} />
        ))}
    </List>
);

const MenuDrawer = ({isLoggedIn, setOpened, opened, docked, ...props })=>(
    <Drawer {...props} docked={docked} open={opened} width={300} onRequestChange={setOpened}>
        <DrawerHeader/>
        {
            !isLoggedIn ? null : <MenuList setOpened={setOpened}/>
        }
    </Drawer>
);

@connect(state=>({
    Lang: state.Lang,
    opened: state.UI.Menu.opened,
    isLoggedIn: !!state.User.user
}),{
    setOpened
})
export default class Menu extends Component{

    render(){
        const props = {
            setOpened: this.props.setOpened,
            isLoggedIn: this.props.isLoggedIn
        };
        return (
            <Responsive minWidth={768}>
                {match=>(match
                    ? <MenuDrawer {...props} opened={true} docked={true} />
                    : <MenuDrawer
                        {...props}
                        opened={this.props.opened}
                        docked={false}
                    />
                )}
            </Responsive>
        )
    }

}