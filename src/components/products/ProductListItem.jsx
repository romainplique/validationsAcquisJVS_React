import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Card, Image, Button, Icon, Label, Input, Divider,
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

    // Gestion du changement de quantité (arrivé à 0 on ne décrémente plus)
    const [quantity, setQuantity] = React.useState(1);
    const handleChangeQuantity = React.useCallback(({ target: { value } }) => {
        setQuantity(value >= 0 ? value : 0);
    }, []);

    // Fonction d'ajout du produit dans le panier
    const handleAddProductToBasket = React.useCallback(() => {
        addProduct(id, quantity);
    }, [
        addProduct,
        id,
        quantity,
    ]);

    // On regarde si le produit actuel est déjà présent dans le panier
    const basketProductItem = basketProductList.find((productItem) => productItem.idProduct === id);

    // Fonction de mise à jour de la quantité du produit dans le panier
    const handleUpdateProductQuantity = React.useCallback(() => {
        updateProductQuantity(basketProductItem.id, basketProductItem.quantity + parseInt(quantity, 10));
    }, [
        updateProductQuantity,
        basketProductItem,
        quantity,
    ]);

    // Si on arrive à retrouver le produit dans le panier alors on incrémente sa quantité
    // Sinon on l'ajoute dans le panier
    const handleButtonClick = basketProductItem !== undefined
        ? handleUpdateProductQuantity
        : handleAddProductToBasket;

    const addButtonEnabled = !parseInt(quantity, 10) > 0;

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
                <Input
                    label='Quantité'
                    type='number'
                    placeholder='1'
                    value={quantity.toString()}
                    onChange={handleChangeQuantity}
                    size='small'
                />
                <Divider />
                <Button
                    basic
                    icon
                    circular
                    primary
                    labelPosition='right'
                    disabled={addButtonEnabled}
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
