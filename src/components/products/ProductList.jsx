import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Pagination, Card, Loader, Container,
} from 'semantic-ui-react';
import ProductListItem from './ProductListItem';
import { getAllProducts } from '../../store/actions/productsActions';

const ProductList = (props) => {
    const {
        getProducts,
        productList = [],
        currentPage = 0,
        lastPage = 0,
    } = props;

    const handlePageChange = React.useCallback((event, response) => {
        getProducts(response.activePage);
    }, [getProducts]);

    console.log(productList);

    return (
        <>
            <Container
                textAlign='center'
            >
                <Pagination
                    pointing
                    secondary
                    style={{ margin: '0.5rem' }}
                    defaultActivePage={currentPage}
                    totalPages={lastPage}
                    onPageChange={handlePageChange}
                />
            </Container>
            <Card.Group
                style={{ padding: '2rem' }}
            >
                {productList !== null && productList !== undefined
                    ? productList.map((product) => (
                        <ProductListItem
                            key={product.id}
                            product={product}
                        />
                    ))
                    : <Loader />}
            </Card.Group>
        </>
    );
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
        currentPage: state.productsReducer?.currentPage,
        lastPage: state.productsReducer?.lastPage,
    }),
    (dispatch) => bindActionCreators({ getProducts: getAllProducts }, dispatch),
)(ProductList);
