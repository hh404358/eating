const getOpenId = require('./getOpenId/index');
const createForm = require('./createForm.js');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'createForm':
      return await createForm(event, context);
  }
};
