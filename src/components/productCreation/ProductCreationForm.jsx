import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    Icon,
    Image,
    Form,
    Segment,
    Header,
    Grid,
    Divider,
    Container,
} from 'semantic-ui-react';
import {
    useHistory,
    useParams,
} from 'react-router-dom';
import { createProduct, updateProduct } from '../../store/actions/productsActions';

const ProductCreationForm = (props) => {
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
    const [price, setPrice] = React.useState(selectedProduct?.price || 10000.0);
    // Génération d'une URL d'image aléatoire
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
    const handleChangePrice = React.useCallback(({ target: { value } }) => {
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
    // Gestion de la mise à jour d'un produit
    const handleUpdateClick = React.useCallback(() => {
        updateSelectedProduct(id);
    }, [updateSelectedProduct, id]);
    // Gestion de la création du produit
    const handleAddClick = React.useCallback(() => {
        createNewProduct(name, description, price, image);
    }, [
        createNewProduct,
        description,
        image,
        name,
        price,
    ]);
    // Gestion de la validation du formulaire
    const handleButtonClick = () => {
        if (selectedProduct !== null && selectedProduct !== undefined) {
            handleUpdateClick();
        } else {
            handleAddClick();
        }
    };
    // Gestion de titre du header
    const headerTitle = selectedProduct !== null && selectedProduct !== undefined
        ? 'Modification d\'un produit'
        : 'Création d\'un produit';
    // Gestion de l'icon du header
    const headerIcon = selectedProduct !== null && selectedProduct !== undefined
        ? 'pencil alternate'
        : 'plus circle';
    // Gestion du libellé du bouton de validation
    const validateButtonText = selectedProduct !== null && selectedProduct !== undefined
        ? 'Enregistrer'
        : 'Créer';

    return (
        <Segment>
            <Header as='h2' content={headerTitle} icon={headerIcon} />
            <Form>
                <Grid columns={2} relaxed='very' stackable padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Form.Input
                                    label='Nom du produit'
                                    placeholder='Ex: Audi A4, Renault Scenic, ...'
                                    value={name}
                                    onChange={handleChangeName}
                                />
                            </Form.Field>
                            <Form.Field width={5}>
                                <Form.Input
                                    label='Prix'
                                    type='number'
                                    icon='euro'
                                    iconPosition='left'
                                    placeholder='20000'
                                    value={price ? price.toString() : '1000'}
                                    onChange={handleChangePrice}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea
                                    label='Description'
                                    placeholder='Dites nous en plus'
                                    rows={12}
                                    value={description}
                                    onChange={handleChangeDescription}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                label='Image'
                                placeholder='http://...'
                                fluid
                                value={image}
                                onChange={handleChangeImage}
                            />
                            <Container fluid textAlign='center'>
                                <Image
                                    src={image}
                                    spaced
                                    size='large'
                                    rounded
                                    onChange={handleChangeImage}
                                />
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
            <Divider horizontal />
            <Grid columns='equal'>
                <Grid.Column>
                    <Button
                        basic
                        icon
                        fluid
                        circular
                        primary
                        labelPosition='right'
                        onClick={handleButtonClick}
                    >
                        <Icon name='save' />
                        {validateButtonText}
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        basic
                        icon
                        fluid
                        circular
                        negative
                        labelPosition='left'
                        onClick={handleCancelClick}
                    >
                        <Icon name='cancel' />
                        Annuler
                    </Button>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

ProductCreationForm.propTypes = {
    createNewProduct: PropTypes.func.isRequired,
    updateSelectedProduct: PropTypes.func.isRequired,
    productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
    }),
    (dispatch) => bindActionCreators({
        createNewProduct: createProduct,
        updateSelectedProduct: updateProduct,
    }, dispatch),
)(ProductCreationForm);
