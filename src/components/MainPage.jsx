import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import MainHeader from './MainHeader';
import { getAllProducts } from '../store/actions/productsActions';
import ProductList from './products/ProductList';
import ProductCreationForm from './productCreation/ProductCreationForm';

const MainPage = (props) => {
    const {
        productList = [],
        getProducts,
    } = props;

    React.useEffect(() => {
        getProducts(1);
    }, [getProducts]);

    return (
        <div style={{ padding: '0.5rem' }}>
            <BrowserRouter>
                <MainHeader title='Validation des acquis' />
                <Switch>
                    <Route
                        render={() => (productList.length > 0
                            ? (
                                <ProductList />
                            )
                            : <Loader />)}
                        path='/productList/:page?'
                    />
                    {/* <Route
                        render={() => (persons.length > 0
                            ? (
                                <MainList />
                            )
                            : <Loader />)}
                        path='/list/:page?'
                    /> */}
                    <Route render={() => <ProductCreationForm productList={productList} />} path='/productCreation/:id?' />
                    <Redirect to='/productList' />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default connect(
    (state) => ({
        productList: state.productsReducer?.productList,
    }),
    (dispatch) => bindActionCreators({
        getProducts: getAllProducts,
    }, dispatch),
)(MainPage);
