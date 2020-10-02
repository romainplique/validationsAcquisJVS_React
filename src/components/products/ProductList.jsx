import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Card, Loader, Dimmer,
} from 'semantic-ui-react';
import ProductListItem from './ProductListItem';
import ProductListItemPlaceholder from './ProductListItemPlaceholder';

const ProductList = (props) => {
    const {
        productList = [],
    } = props;

    return (
        productList !== null && productList !== undefined
            ? (
                <>
                    <Card.Group
                        style={{ padding: '2rem' }}
                    >
                        {productList.length > 0
                            ? productList.map((product) => (
                                <ProductListItem
                                    key={product.id}
                                    product={product}
                                />
                            ))
                            : <ProductListItemPlaceholder />}
                    </Card.Group>
                </>
            )
            : (
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            ));
};

ProductList.propTypes = {
    productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
    }),
    (dispatch) => bindActionCreators({}, dispatch),
)(ProductList);
