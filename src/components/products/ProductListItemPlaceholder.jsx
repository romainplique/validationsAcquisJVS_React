import React from 'react';
import {
    Button,
    Card,
    Placeholder,
    Label,
    Icon,
} from 'semantic-ui-react';

const ProductListItemProvider = () => (
    <>
        <Card>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Card.Header>
                    <Button
                        basic
                        primary
                        disabled
                        icon='pencil alternate'
                    />
                    <span style={{ marginLeft: '0.5rem' }}>
                        {' '}
                    </span>
                </Card.Header>
                <Card.Meta textAlign='center'>
                    <Label color='blue' attached='top right' size='large'>
                        {' '}
                    </Label>
                </Card.Meta>
                <Card.Description>
                    <Placeholder>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Card.Description>

            </Card.Content>

            <Card.Content extra textAlign='center'>
                <Button
                    icon
                    primary
                    basic
                    disabled
                    attached='bottom'
                    labelPosition='right'
                >
                    Ajouter au panier
                    <Icon
                        name='cart arrow down'
                        color='blue'
                        disabled
                    />
                </Button>
            </Card.Content>
        </Card>
    </>
);

export default ProductListItemProvider;
