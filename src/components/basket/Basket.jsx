import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Segment,
    Header,
    Loader,
    Dimmer,
    Table,
} from 'semantic-ui-react';
import BasketItem from './BasketItem';

const Basket = (props) => {
    const {
        basketProductList = [],
    } = props;

    return (
        basketProductList.length > 0
            ? (
                <Segment>
                    <Header as='h2' content='Panier' icon='shopping basket' />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center' colSpan='2'>Produit</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Description</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Prix unitaire (€)</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Quantité</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Prix total (€)</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {basketProductList !== null && basketProductList !== undefined
                                ? basketProductList.map((basketProduct) => (
                                    <BasketItem
                                        key={basketProduct.id}
                                        basketProduct={basketProduct}
                                    />
                                ))
                                : (<Loader />)}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='6'>
                                    Total
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
            ) : (
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            )
    );
};

export default connect(
    (state) => ({
        basketProductList: state.basketProductsReducer?.basketProductList,
        currentPage: state.basketProductsReducer?.currentPage,
        lastPage: state.basketProductsReducer?.lastPage,
    }),
    (dispatch) => bindActionCreators({}, dispatch),
)(Basket);
