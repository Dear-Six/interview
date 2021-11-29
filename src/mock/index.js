const Mock = require('mockjs')
import reviewMock from './mockList/reviewMock'
import addReview from './mockList/addReview'
Mock.mock(/\/reviewMock/, 'get', reviewMock)
Mock.mock(/\/addReview/, 'get', addReview)
export default Mock
