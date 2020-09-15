import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberInput from 'semantic-ui-react-numberinput';
import {
    Form, Button, Icon, Input, TextArea, Image, Label,
} from 'semantic-ui-react';
import {
    useHistory,
    useParams,
} from 'react-router-dom';
import { createProduct, updateProduct } from '../../store/actions/productsActions';

const MainForm = (props) => {
    // Récupération des params passés à la route (ici l'id du produit)
    const { id } = useParams();
    const {
        createNewProduct,
        updateSelectedProduct,
        productList = [],
    } = props;
    // /!\ Attention, avec le === on compare aussi le type, or id est une chaine donc il faut le cast en entier
    const selectedProduct = productList.find((product) => product.id === parseInt(id, 10));
    // Gestion des valeurs par défaut des inputs
    const [name, setName] = React.useState(selectedProduct?.name || '');
    const [description, setDescription] = React.useState(selectedProduct?.description || '');
    const [price, setPrice] = React.useState(selectedProduct?.price || '');

    const min = 1;
    const max = 100;
    const rand = Math.floor(min + Math.random() * (max - min));
    const [image, setImage] = React.useState(
        selectedProduct?.image
        || `https://loremflickr.com/640/480/car,cars,bus?lock=${rand}`,
    );

    // Gestion des "onChange" des inputs
    const handleChangeName = React.useCallback(({ target: { value } }) => {
        setName(value);
    }, [setName]);
    const handleChangeDescription = React.useCallback(({ target: { value } }) => {
        setDescription(value);
    }, [setDescription]);
    const handleChangePrice = React.useCallback((value) => {
        setPrice(value);
    }, [setPrice]);
    const handleChangeImage = React.useCallback(({ target: { value } }) => {
        setImage(value);
    }, [setImage]);

    // Gestion du retour en arrière
    const history = useHistory();
    const handleCancelClick = () => {
        history.goBack();
    };

    // Gestion de la validation du formulaire
    const handleUpdateClick = React.useCallback(() => {
        updateSelectedProduct(id);
    }, [updateSelectedProduct, id]);

    const handleAddClick = React.useCallback(() => {
        createNewProduct(name, description, price, image);
    }, [
        createNewProduct,
        description,
        image,
        name,
        price,
    ]);

    const handleButtonClick = () => {
        if (selectedProduct !== null && selectedProduct !== undefined) {
            handleUpdateClick();
        } else {
            handleAddClick();
        }
    };

    return (
        <div style={{ margin: '2rem', padding: '1em' }}>
            <Form>
                <Form.Field
                    inline
                    width='5'
                >
                    <Image
                        src={image}
                        spaced
                        size='medium'
                        onChange={handleChangeImage}
                    />
                    <Input
                        label='Image'
                        placeholder='http://...'
                        value={image}
                        onChange={handleChangeImage}
                    />
                </Form.Field>
                <Form.Field width='5'>
                    <Input
                        label='Nom du produit'
                        placeholder='Ex: Audi A4, Renault Scenic, ...'
                        value={name}
                        onChange={handleChangeName}
                    />
                </Form.Field>
                <Form.Field width='5'>
                    <Label style={{ fontSize: '0.9rem' }}>
                        Description
                    </Label>
                    <TextArea
                        placeholder='Dites nous en plus'
                        value={description}
                        onChange={handleChangeDescription}
                    />
                </Form.Field>
                <Form.Field width='5' inline>
                    <Label style={{ fontSize: '0.9rem' }}>
                        Prix
                    </Label>
                    <NumberInput
                        allowMouseWheel
                        placeholder='1000.00'
                        doubleClickStepAmount={100}
                        precision={2}
                        stepAmount={10}
                        min={1000}
                        max={50000}
                        buttonPlacement="right"
                        size='small'
                        value={price ? price.toString() : '1000'}
                        onChange={handleChangePrice}
                    />
                </Form.Field>
                <Form.Field
                    inline
                    width='5'
                >
                    <Button.Group style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <Button
                                positive
                                onClick={selectedProduct !== null && selectedProduct !== undefined
                                    ? handleUpdateClick
                                    : handleAddClick} // Créer une méthode conditionnelle, plus propre
                            > */}
                        <Button
                            positive
                            onClick={handleButtonClick}
                        >
                            <Icon name='save' />
                            {selectedProduct !== null && selectedProduct !== undefined
                                ? 'Enregistrer la modification'
                                : 'Ajouter le produit'}
                        </Button>
                        <Button.Or text='ou' />
                        <Button
                            negative
                            onClick={handleCancelClick}
                        >
                            <Icon name='cancel' />
                            Annuler
                        </Button>
                    </Button.Group>
                </Form.Field>

            </Form>
        </div>
    );
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
    }),
    (dispatch) => bindActionCreators({
        createNewProduct: createProduct,
        updateSelectedProduct: updateProduct,
    }, dispatch),
)(MainForm);
