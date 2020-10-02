import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Card, Image, Button, Icon, Label,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { addProductToBasket, updateBasketProductQuantity } from '../../store/actions/basketProductsActions';

const ProductListItem = (props) => {
    const {
        basketProductList = [],
        product,
        addProduct,
        updateProductQuantity,
    } = props;
    const {
        id,
        name,
        description,
        price,
        image,
    } = product;
    const nameUpperCase = name?.toUpperCase();

    // Fonction d'ajout du produit dans le panier
    const handleAddProductToBasket = React.useCallback(() => {
        addProduct(id, 1);
    }, [addProduct, id]);

    // On regarde si le produit actuel est déjà présent dans le panier
    const basketProductItem = basketProductList.find((productItem) => productItem.idProduct === id);

    // Fonction de mise à jour de la quantité du produit dans le panier
    const handleUpdateProductQuantity = React.useCallback(() => {
        updateProductQuantity(basketProductItem.id, basketProductItem.quantity + 1);
    }, [updateProductQuantity, basketProductItem]);

    // Si on arrive à retrouver le produit dans le panier alors on incrémente sa quantité
    // Sinon on l'ajoute dans le panier
    const handleButtonClick = basketProductItem !== undefined
        ? handleUpdateProductQuantity
        : handleAddProductToBasket;

    return (
        <Card key={id} centered raised>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    <Button
                        basic
                        primary
                        as={NavLink}
                        icon='pencil alternate'
                        to={`/productCreation/${id}`}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>
                        {nameUpperCase}
                    </span>
                </Card.Header>
                <Card.Meta textAlign='center'>
                    <Label color='blue' attached='top right' size='large'>
                        {price}
                        {' '}
                        €
                    </Label>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
                <Button
                    icon
                    primary
                    basic
                    attached='bottom'
                    labelPosition='right'
                    onClick={handleButtonClick}
                >
                    Ajouter au panier
                    <Icon
                        name='cart arrow down'
                        color='blue'
                    />
                </Button>
            </Card.Content>
        </Card>
    );
};

export default connect(
    (state) => ({
        basketProductList: state.basketProductsReducer?.basketProductList,
    }),
    (dispatch) => bindActionCreators({
        addProduct: addProductToBasket,
        updateProductQuantity: updateBasketProductQuantity,
    }, dispatch),
)(ProductListItem);
