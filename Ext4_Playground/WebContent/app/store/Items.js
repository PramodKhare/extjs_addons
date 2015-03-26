Ext.define('Application.store.Items', {
      extend : 'Ext.data.TreeStore',
      model : 'Application.model.Item',
      autoLoad : true,
      // Define the root of the json file
      root : {
        // Root should be expanded on
        // the application start
        expanded : true
      },
      proxy : {
        // Defined this proxy type
        type : 'ajax',
        // Data source
        url : 'data/items.json',
        // Reader should be configured for
        // json parsing
        reader : {
          type : 'json'
        }
      }
    });

Ext.define('Application.store.mystore', {
      extend : 'Ext.data.Store',
      autoLoad : true,
      alias : 'store.mystore',
      storeId : 'mystoreid',
      autoDestroy : true,
      fields : ['firstName', 'lastName'],
      data : [{
            firstName : 'Ed',
            lastName : 'Spencer'
          }, {
            firstName : 'Tommy',
            lastName : 'Maintz'
          }, {
            firstName : 'Aaron',
            lastName : 'Conran'
          }, {
            firstName : 'Jamie',
            lastName : 'Avins'
          }]
    });
