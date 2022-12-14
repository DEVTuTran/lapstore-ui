import { all } from 'redux-saga/effects'
import categoryNavSaga from './sagas/categoryNavSaga'
import productSaga from './sagas/productSaga'
import productBySubSaga from './sagas/productBySubSaga'
import brandSaga from './sagas/brandSaga'
import inventorySaga from './sagas/inventorySaga'
import reviewSaga from './sagas/reviewSaga'
import userSaga from './sagas/userSaga'
import cartSaga from './sagas/cartSaga'
import notificationSaga from './sagas/notificationSaga'
import provinceSaga from './sagas/provinceSaga'
import orderSaga from './sagas/orderSaga'
import shippingSaga from './sagas/shippingSaga'
import globalSaga from './sagas/globalSaga'

export default function* rootSaga() {
  yield all([
    brandSaga(),
    categoryNavSaga(),
    productSaga(),
    inventorySaga(),
    reviewSaga(),
    userSaga(),
    cartSaga(),
    productBySubSaga(),
    notificationSaga(),
    provinceSaga(),
    orderSaga(),
    shippingSaga(),
    globalSaga(),
  ])
}
