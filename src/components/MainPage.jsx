import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import MainHeader from './MainHeader';
import ProductList from './products/ProductList';
import ProductCreationForm from './productCreation/ProductCreationForm';
import Basket from './basket/Basket';
import { getAllProducts } from '../store/actions/productsActions';
import { getAllBasketProducts } from '../store/actions/basketProductsActions';

const MainPage = (props) => {
    const {
        getProducts,
        getBasket,
    } = props;

    React.useEffect(() => {
        getProducts();
    }, [getProducts]);

    React.useEffect(() => {
        getBasket();
    }, [getBasket]);

    return (
        <div style={{ padding: '0.5rem' }}>
            <BrowserRouter>
                <MainHeader title='Validation des acquis' />
                <Switch>
                    <Route
                        render={() => (<ProductList />)}
                        path='/productList/:page?'
                    />
                    <Route
                        render={() => (<Basket />)}
                        path='/basket/:page?'
                    />
                    <Route
                        render={() => <ProductCreationForm />}
                        path='/productCreation/:id?'
                    />
                    <Redirect to='/productList' />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

MainPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getBasket: PropTypes.func.isRequired,
};

export default connect(
    null,
    (dispatch) => bindActionCreators({
        getProducts: getAllProducts,
        getBasket: getAllBasketProducts,
    }, dispatch),
)(MainPage);
