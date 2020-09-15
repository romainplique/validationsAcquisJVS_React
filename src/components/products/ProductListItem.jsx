import React from 'react';
import {
    Card, Image, Button, Icon,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ProductListItem = (props) => {
    const { product } = props;
    const {
        id,
        name,
        description,
        price,
        image,
    } = product;
    return (
        <Card key={id} centered raised>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    <Button
                        as={NavLink}
                        icon='pencil alternate'
                        to={`/productCreation/${id}`}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>
                        {name.toUpperCase()}
                    </span>
                </Card.Header>
                <Card.Meta textAlign='center'>
                    <span style={{ margin: '0.5rem' }}>
                        {price}
                        {' '}
                        €
                    </span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
                <Button
                    icon
                    attached='bottom'
                    labelPosition='right'
                    to={`/productCreation/${id}`}
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

export default ProductListItem;
