import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Image, Button, Icon, Table, Divider,
} from 'semantic-ui-react';
import {
    removeProductFromBasket, updateBasketProductQuantity,
} from '../../store/actions/basketProductsActions';

const BasketItem = (props) => {
    const {
        basketProduct,
        productList = [],
        updateProductQuantity,
        removeProduct,
    } = props;

    const {
        id,
        idProduct,
        quantity,
    } = basketProduct;

    const basketProductItem = productList.find((product) => product.id === idProduct);

    const {
        name,
        description,
        price,
        image,
    } = basketProductItem || {};
    const nameUpperCase = name.toUpperCase();
    // On calcule le prix total de la ligne de produit
    const totalPrice = price !== null && price !== undefined
        ? (Math.round((quantity * price) * 100) / 100).toFixed(2)
        : 0;

    const handleIncreaseQuantity = React.useCallback(() => {
        updateProductQuantity(id, quantity + 1);
    }, [
        updateProductQuantity,
        id,
        quantity,
    ]);

    const handleDecreaseQuantity = React.useCallback(() => {
        updateProductQuantity(id, quantity - 1);
    }, [
        updateProductQuantity,
        id,
        quantity,
    ]);

    const handleDeleteBasketProduct = React.useCallback(() => {
        removeProduct(id);
    }, [removeProduct, id]);

    return (
        basketProductItem !== undefined && basketProductItem !== null
            ? (
                <Table.Row key={id}>
                    <Table.Cell>
                        <Image src={image} size='small' rounded />
                    </Table.Cell>
                    <Table.Cell>
                        {nameUpperCase}
                    </Table.Cell>
                    <Table.Cell>
                        {description}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {price}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group>
                            <Button negative onClick={handleDecreaseQuantity}>
                                <Icon name='minus' />
                            </Button>
                            <Button.Or text={quantity} color='black' />
                            <Button primary onClick={handleIncreaseQuantity}>
                                <Icon name='plus' />
                            </Button>
                        </Button.Group>
                        <Divider />
                        <Button icon secondary onClick={handleDeleteBasketProduct}>
                            <Icon name='trash alternate outline' />
                        </Button>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {totalPrice}
                    </Table.Cell>
                </Table.Row>
            ) : <></>
    );
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
    }),
    (dispatch) => bindActionCreators({
        removeProduct: removeProductFromBasket,
        updateProductQuantity: updateBasketProductQuantity,
    }, dispatch),
)(BasketItem);
