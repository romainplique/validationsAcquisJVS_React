import React from 'react';
import {
    Header, Icon,
} from 'semantic-ui-react';
import MainMenu from './MainMenu';

const MainHeader = (props) => {
    const { title } = props;
    return (
        <>
            <Header
                as='h1'
                textAlign='center'
                icon
            >
                <Icon name='react' />
                <Header.Content>
                    {title}
                </Header.Content>
            </Header>
            <MainMenu />
        </>
    );
};

export default MainHeader;
