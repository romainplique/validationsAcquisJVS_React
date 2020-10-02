import React from 'react';
import {
    Menu, Icon,
} from 'semantic-ui-react';
import {
    NavLink,
} from 'react-router-dom';

const MainMenu = () => (
    <>
        <Menu tabular>
            <Menu.Menu>
                {/* -------------------------- CARDS ------------------------------- */}
                <Menu.Item as={NavLink} to='/productList' name='productList'>
                    <Icon name='address card' size='large' />
                    Liste des produits
                </Menu.Item>
                {/* -------------------------- LIST ------------------------------- */}
                <Menu.Item as={NavLink} to='/productCreation' name='productCreation'>
                    <Icon name='pencil alternate' size='large' />
                    Gestion produit
                </Menu.Item>
                {/* -------------------------- FORM ------------------------------- */}
                <Menu.Item as={NavLink} to='/basket' name='basket'>
                    <Icon name='shopping basket' size='large' />
                    Panier
                </Menu.Item>
                {/* --------------------------------------------------------- */}
            </Menu.Menu>
        </Menu>
    </>
);

export default MainMenu;
