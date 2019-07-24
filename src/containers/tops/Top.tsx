import React from 'react';
import { connect } from 'react-redux';
import { DispatchThunk } from '@store';
import { Panel, PanelHeader, Group, List, Cell, Avatar } from '@vkontakte/vkui';
import { UserTop } from '@models';
import Icon16Like from '@vkontakte/icons/dist/16/like';

import {
    getTopUsers,
    Thunks as apiThunks
} from '@store/api';

interface TopProps {
    id: any;
    isFetching: boolean;
    isErrorFetchingTopUsers: boolean;
    topUsers: any[];
    onLoadUserInfo: any;
}

interface TopState {
    topUsers: any;
    isFetching: boolean;
}

class TopComponent extends React.Component<any, TopState> {
    state = {
        topUsers: [],
        isErrorFetchingTopUsers: false,
        isFetching: false,
    };

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
    }

    render() {
        const { topUsers } = this.props;
        return (
            <Panel id="top">
                <PanelHeader>
                    Топ
                </PanelHeader>
                <Group title="Лучшие пользователи">
                    <List>
                        {
                            topUsers.map((topUser) => (
                                <Cell
                                    before={<Avatar
                                        size={40}
                                        src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"

                                    />}
                                    indicator={topUser.avgLikes}
                                    asideContent={<Icon16Like className="topLike" />}
                                >
                                    {topUser.username}
                                </Cell>
                            ))
                        }
                    </List>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topUsers: getTopUsers(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onLoadUserInfo: () => {
        dispatch(apiThunks.getTopUsers());
    },
});

export const Top = connect(mapStateToProps, mapDispatchToProps)(TopComponent);
