
module.exports = {
  recipeId: function(nextprops){
    let props = nextprops||{}, location = props.location||{}, query = location.query||{}, recipeId = query.recipeId||''; //获取页面recipeId参数
    return recipeId;
  }
};
