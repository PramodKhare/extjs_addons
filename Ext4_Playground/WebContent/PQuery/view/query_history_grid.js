var getQuerySearchHistoryGridPanel = function() {
  var historyGridPanel = Ext.getCmp('historyGridPanelId');
  if (historyGridPanel != null) {
    return historyGridPanel;
  }
  historyGridPanel = Ext.create('Ext.grid.Panel', {
        title : 'Query History',
        tooltip : 'History of current session queries',
        stripeRows : true,
        layout : 'fit',
        id : 'historyGridPanelId',
        border : false,
        store : Ext.data.StoreManager.lookup('queryHistoryStore'),
        columns : [{
              text : 'ID',
              dataIndex : 'id',
              sortable : true
            }, {
              text : 'Results',
              dataIndex : 'results',
              sortable : true
            }, {
              text : 'Query',
              dataIndex : 'query',
              sortable : true,
              flex : 1
            }, {
              text : 'Parsed Query',
              dataIndex : 'parsedQuery',
              sortable : true,
              flex : 1
            }],
        viewConfig : {
          scrollOffset : 0,
          forceFit : true
        }
      });
  return historyGridPanel;
}