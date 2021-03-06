import React from "react"
import eventBus from '../../utils/eventBus'

import {
    Icon,
    Classes,
    Drawer,
    Position
} from "@blueprintjs/core"

export interface DrawerState {
    autoFocus: boolean;
    canEscapeKeyClose: boolean;
    canOutsideClickClose: boolean;
    enforceFocus: boolean;
    hasBackdrop: boolean;
    isOpen: boolean;
    position?: Position;
    size: string;
    usePortal: boolean;
    currentUser: string
}
export default class NavigationDrawer extends React.PureComponent<DrawerState> {
    public state: DrawerState = {
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        isOpen: false,
        position: Position.LEFT,
        size: Drawer.SIZE_SMALL,
        usePortal: true,
        currentUser: 'anonymous'
    }

    public render() {
        const {currentUser} = this.state

        const style = {
            color: 'white',
            padding: '7px'
        }

        return (
            <>  
            <div className="icon-wrapper">
                <Icon icon="list" style={style} iconSize={20} onClick={this.handleOpen} />
                </div>
                <Drawer
                    icon="user"
                    onClose={this.handleClose}
                    title={currentUser === 'anonymous' ? '로그인 하세요' : `${currentUser}님, 환영합니다.`}
                    {...this.state}
                >
                    <div className={Classes.DRAWER_BODY}>
                        <div className={Classes.DIALOG_BODY}>
                            <p>
                                <strong>
                                    카테고리
                                </strong>
                            </p>
                            <p>
                                내용
                            </p>
                        </div>
                    </div>
                    <div className={Classes.DRAWER_FOOTER}>Footer</div>
                </Drawer>
            </>
        )
    }

    componentDidMount() {
        eventBus.on("fetchUser", (data: JSON) => {
            this.setState({ currentUser: data })
            console.log(data)
          }
        )
      }

    private handleOpen = () => this.setState({ isOpen: true })
    private handleClose = () => this.setState({ isOpen: false })
}